let elements = {};
let sumbitForm = {};

function App(options, _template) {
    let self = this;

    self.template = _template;
    self.elements = _template.elements;
    self.sumbitForm = _template.elements.sumbitForm;

    elements = _template.elements;
    sumbitForm = _template.elements.sumbitForm;

    if (options)
        this.init(options);
}

App.prototype.init = function (options) {
    let self = this;
    self.options = {};
    self.options = Object.assign(self.options, options || {});
};

App.prototype.initForms = function () {
    let self = this;
    let $pageContent = document.getElementById("page-content");
        let sumbit_form = $pageContent.querySelector("#sumbit_form");

        let submit_button = sumbit_form.querySelector("#submit_btn");
        submit_button.addEventListener("click", function (e) {
            e.preventDefault;
            self.onFormSubmitted();
        });

        sumbit_form.addEventListener("submit", function (e) {
            e.preventDefault;
            self.onFormSubmitted();
            return false;
        }, false);        

        let submit_all_form = $pageContent.querySelector("#sumbit_all_form");

        let submit_all_btn = submit_all_form.querySelector("#submit_all_btn");
        submit_all_btn.addEventListener("click", function (e) {
            e.preventDefault;
            self.postAllLastUpdatedToTaxilla();
        });
};

App.prototype.onFormSubmitted = function () {
  
  elements.errorP.innerHTML = "";
  if (sumbitForm.transaction_number.value.length == 0) {
    this.showErrorPopup("Enter a valid Transaction Number");
  } else {
    this.postToTaxilla();
  }
};

App.prototype.showLoader = function() {
  elements.loader.classList.add("loader");
}

App.prototype.hideLoader = function() {
  elements.loader.classList.remove("loader");
}

App.prototype.showErrorPopup = function(error = false, errorDetails = false) {
    let self = this;    
  elements.errorP.innerHTML = "";

  if (error) {
    elements.errorP.innerText = error;
  }

  if (errorDetails) {
    var errorDetailsBlock = document.getElementById("error-details");
        errorDetailsBlock.style.display = "block";

        var block = document.getElementById("error-details-code");
        block.inneHTML = JSON.stringify(errorDetails, null, 4);

        const htmlJson = JSON.stringify(errorDetails, null, 4);

        const html = Prism.highlight(htmlJson, Prism.languages.json, "json");
        block.innerHTML = html;
  }

  elements.errorContainer.classList.add("active");
  setTimeout(function () {
    elements.errorContainer.classList.add("zoom");
  }, 10);

  setTimeout(function () {
    self.hideLoader();
  }, 100);
}

App.prototype.hideErrorPopup = function() {
  elements.errorContainer.classList.remove("active");
  elements.errorContainer.classList.remove("zoom");
}

App.prototype.showInfoPopup = function(info) {
    let self = this;   
  if (info) {
    const infoBlock = document.getElementById("info");
    infoBlock.innerHTML = info;
  }

  elements.infoContainer.classList.add("active");
  setTimeout(function () {
    elements.infoContainer.classList.add("zoom");
  }, 10);

  setTimeout(function () {
    self.hideLoader();
  }, 100);
}

App.prototype.hideInfoPopup = function() {
  elements.infoContainer.classList.remove("active");
  elements.infoContainer.classList.remove("zoom");
}


App.prototype.postData = async function (url, method, data, async = true) {
    let self = this;
    self.showLoader();
    $.ajax({
    url: url,
    type: method,
    traditional: true,
    async: async,
    contentType: "application/json",
    dataType: "json",
    success: function (response) {
      self.showInfoPopup(response.Message);
    },
    error: function (data) {
      let errorText = "";
      let response = data;
      if (data.responseJSON) response = data.responseJSON;

      if (response.errorMessage) errorText = response.errorMessage;
      else if (response.Message) errorText = response.Message;
      else if (response.message) errorText = response.message;
      else if (response.statusText) errorText = response.statusText;
      else errorText = "Internal Server Error";

      var errorData = null;

      if (response.Data) errorData = response.Data;
      else if (response.data) errorData = response.data;

      if (
        typeof data.response === "undefined" &&
        typeof data.responseJSON === "undefined"
      ) {
        errorData =
          "A network error occurred. " +
          "This could be a CORS issue or a dropped internet connection. ";
      }
      self.showErrorPopup(errorText, errorData);
    },
    catch: function (error) {
      console.error("CORS error or other error:", error);
    },
  });
}


App.prototype.registerAfterload = function(f) {
    document.addEventListener("DOMContentLoaded", f, false);
}


export default App;