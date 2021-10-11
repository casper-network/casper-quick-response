var time = Math.floor(Date.now() / 1000);
document.getElementById("transaction_id_input").placeholder = "Transaction ID (" + time.toString() + ")";

var animation = bodymovin.loadAnimation({
  container: document.getElementById('animationDiv'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'assets/datablack.json'
});

var csprline = bodymovin.loadAnimation({
  container: document.getElementById('csprline'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'assets/csprline.json'
});

var qrcode = new QRCode(document.getElementById("qrcode"), {
	text: "m",
	colorDark : "#000000",
	colorLight : "#ffffff",
	correctLevel : QRCode.CorrectLevel.H
});


function maybeMake() {
  var address_input = document.getElementById("recipient_input");
  var amount_input = document.getElementById("amount_input");
  var transaction_id_input = document.getElementById("transaction_id_input");
  var address = address_input.value;
  var amount = amount_input.value;
  var transaction_id = transaction_id_input.value;

  if (transaction_id.length == 0) {
    transaction_id = Math.floor(Date.now() / 1000).toString();
  }

  let qrLogoHolder = document.getElementById("QRLogoHolder");
  let qrHolder = document.getElementById("qrcode");
  let qrImage = qrHolder.querySelector('img');

  qrImage.style.width = "100%";
  qrImage.style.height = "100%";

  if (address.length != 0 && amount.length != 0) {
    make(address, amount, transaction_id);
    qrLogoHolder.style.display = "none";
    qrHolder.style.display = "block";
  } else {
    qrLogoHolder.style.display = "block";
    qrHolder.style.display = "none";
  }
}

function make(address, amount, transaction_id) {
  let switchState = document.getElementById("networkSwitch");
  var url = "https://";
  if (!switchState.checked) {
    url += "testnet.";
  }
  if (transaction_id.length > 0) {
    transaction_id = "&transfer_id=" + transaction_id;
  } else {
    transaction_id = "";
  }
  url += "cspr.live/transfer?recipient=" + address + "&amount=" + amount.toString() + transaction_id;
  console.log(url);
  qrcode.clear();
  qrcode.makeCode(url);
  document.getElementById("qrlink").href = url;
  document.getElementById("downlink").href = document.querySelector('img').src;
}
