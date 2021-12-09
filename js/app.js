// variabels
const btnTop = document.querySelector("#button_top");
const lclstrg = window.localStorage;
const cekQuote = lclstrg.getItem("quotes");
const cekPlace = lclstrg.getItem("place");
const quoteContainer= document.querySelector("#quote_container");
const quoteInput = document.querySelector("#quote_input");

// actions
window.onscroll = () => {
  if (window.pageYOffset > 10) {
    btnTop.classList.add("active");
  }else {
    btnTop.classList.remove("active");
  }
}
window.addEventListener("DOMContentLoaded", () => {
  if(cekQuote == null) {
    createBaseQuote();
  }
  if (cekPlace == null) {
    setBasicPlace();
  }
  showAllQuote()
})

// functions
function createBaseQuote() {
  const data = [
    {
      quote : 'Tetap <b>Putus Asa</b> dan Jangan pernah <b><i>semangat</i></b>',
      created_at : getDateNow()
    }
  ];
  lclstrg.setItem("quotes", JSON.stringify(data));
}
function setBasicPlace() {
  lclstrg.setItem("place", "jogja");
}
function getDateNow() {
  const date = new Date();
  const Y = date.getFullYear();
  const m = date.getMonth() + 1;
  let d = date.getDate();
  if (d < 10) {
    d = "0" + d;
  }
  return `${Y}-${m}-${d}`;
}
function convertDate(data) {
  const arr = data.split("-");
  const arrBlnIndo = [
    "Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  let bln = parseInt(arr[1]) - 1;
  bln = arrBlnIndo[bln];
  return `${arr[2]} ${bln} ${arr[0]}`;
}
function showAllQuote() {
  const allQuote = JSON.parse(lclstrg.getItem("quotes"));
  quoteContainer.innerHTML = "";
  quoteContainer.innerHTML = quoteTemplate(allQuote.reverse());
}
function quoteTemplate(data) {
  let tmplt = "";
  const place = lclstrg.getItem("place");
  data.forEach((d) => {
    let dateInIndo = convertDate(d.created_at);
    tmplt += `
        <div class="col-lg-4 col-md-6 col-sm-12 p-2">
          <div class="quote_box rounded shadow-sm pt-3 pb-2 px-3">
            <q class="quote_content">
              ${d.quote}
            </q>
            <hr class="mt-3 mb-2">
            <div class="quote_date text-right">
              ${place}, ${dateInIndo}
            </div>
          </div>
        </div>
    `;
  });
  return tmplt;
}

function addQuote() {
  if (quoteInput.value == "") {
    alert("please fill the field");
    return false;
  }
  createNewQuote(quoteInput.value);
  showAllQuote()
  hideModal();
  setTimeout(showSuccessMsg, 300);
}
function createNewQuote(dt) {
  const allQuote = JSON.parse(lclstrg.getItem("quotes"));
  const newData = {
    quote : filterQuote(dt),
    created_at : getDateNow()
  }
  allQuote.push(newData);
  lclstrg.setItem("quotes", JSON.stringify(allQuote));
}
function showSuccessMsg() {
  alert("success");
}
function hideModal() {
  $('#modalAdd').modal('hide');
  quoteInput.value = ""; 
}

function filterQuote(qt) {
  let rslt = "";
  rslt = qt.split("[").join("<b>");
  rslt = rslt.split("]").join("</b>");
  rslt = rslt.split("{").join("<i>");
  rslt = rslt.split("}").join("</i>");
  return rslt;
}