import App from "./app.js";

let template = {
    elements: {
        sumbitForm: document.getElementById("sumbit_form"),
        errorContainer: document.getElementById("alert-error"),
        infoContainer: document.getElementById("alert-info"),
        errorP: document.getElementById("error"),
        errorDetailsBlock: document.getElementById("error-details"),
        loader: document.getElementById("loader"),
    }
}

var app = new App({}, template);

app.configEnv = {
    baseDomain: import.meta.env.VITE_API_DOMAIN,
    useFunctionKey: import.meta.env.VITE_FUNCTION_KEY_ENABLE,
    action: "post",
    functionsUrls: {
        searchReceivablesInvoices: "searchReceivablesInvoices",
        searchReceivablesCreditMemos: "searchReceivablesCreditMemos",
        postReceivablesInvoicesToTaxilla: "postReceivablesInvoicesToTaxilla",
        postReceivablesCreditMemosToTaxilla: "postReceivablesCreditMemosToTaxilla",
        postLastUpdatedReceivablesInvoicesToTaxilla: "postLastUpdatedReceivablesInvoicesToTaxilla",
        postLastUpdatedReceivablesCreditMemosToTaxilla: "postLastUpdatedReceivablesCreditMemosToTaxilla",
    },
    functionsKeys: {
        postReceivablesInvoicesToTaxilla: import.meta.env.VITE_FUNCTION_KEY_postReceivablesInvoicesToTaxilla,
        postReceivablesCreditMemosToTaxilla: import.meta.env.VITE_FUNCTION_KEY_postReceivablesCreditMemosToTaxilla,
        postLastUpdatedReceivablesInvoicesToTaxilla: import.meta.env.VITE_FUNCTION_KEY_postLastUpdatedReceivablesInvoicesToTaxilla,
        postLastUpdatedReceivablesCreditMemosToTaxilla: import.meta.env.VITE_FUNCTION_KEY_postLastUpdatedReceivablesCreditMemosToTaxilla,
    },
}

App.prototype.postToTaxilla = async function () {
  let self = this;
  let env = self.configEnv;
  let domain = env.baseDomain;
  let action = env.action;

  let url = domain + "/api/oracle/";
  let functionKey = "";

  let transaction_number = self.sumbitForm.transaction_number.value;
  let transaction_type = self.sumbitForm.transaction_type;

  if (transaction_type.checked) {
    functionKey = env.useFunctionKey
      ? env.functionsKeys.postReceivablesInvoicesToTaxilla
      : "";
    url +=
      action == "search"
        ? env.functionsUrls.searchReceivablesInvoices
        : env.functionsUrls.postReceivablesInvoicesToTaxilla;
  } else {
    functionKey = env.useFunctionKey
      ? env.functionsKeys.postReceivablesCreditMemosToTaxilla
      : "";
    url +=
      action == "search"
        ? env.functionsUrls.searchReceivablesCreditMemos
        : env.functionsUrls.postReceivablesCreditMemosToTaxilla;
  }

  url +=
    "?code=" +
    functionKey +
    "&q=TransactionNumber IN (" +
    transaction_number +
    ")";

  //let url = 'http://localhost:7295/api/oracle/searchReceivablesInvoices?q=TransactionNumber IN (' + transaction_number + ")";
  url = encodeURI(url);

  this.postData(url, "GET", {}, true);
};

App.prototype.postAllLastUpdatedToTaxilla = async function () {
  let self = this;
  let env = self.configEnv;
  let domain = env.baseDomain;
  let action = env.action;

  let url = domain + "/api/oracle/";
  let functionKey = "";

  let transaction_number = sumbitForm.transaction_number.value;
  let transaction_type = sumbitForm.transaction_type;

  if (transaction_type.checked) {
    functionKey = env.useFunctionKey
      ? env.functionsKeys.postLastUpdatedReceivablesInvoicesToTaxilla
      : "";
    url += env.functionsUrls.postLastUpdatedReceivablesInvoicesToTaxilla;
  } else {
    functionKey = env.useFunctionKey
      ? env.functionsKeys.postLastUpdatedReceivablesCreditMemosToTaxilla
      : "";
    url += env.functionsUrls.postLastUpdatedReceivablesCreditMemosToTaxilla;
  }

  url +=
    "?code=" +
    functionKey;

  url = encodeURI(url);

  this.postData(url, "GET", {}, true);
};

console.log(app)
console.log(import.meta.env)
console.log(import.meta.env.VITE_TEST)
console.log(process.env)
console.log(window.env)

document.addEventListener(
  "DOMContentLoaded",
  function () {
    app.template.elements.errorContainer
      .querySelector(".modal-icon")
      .addEventListener("click", app.hideErrorPopup);
    app.template.elements.infoContainer.addEventListener("click", app.hideInfoPopup);
  },
  false
);

document.addEventListener(
  "keydown",
  function (e) {
    if (e.code === "Escape") {
      app.hideErrorPopup();
    }
  },
  false
);

app.registerAfterload(
    function () {
    app.initForms();
        setTimeout(function () {
            return document.sumbit_form.transaction_number.focus();
        }, 50);
}
);



