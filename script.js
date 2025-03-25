let openImage = document.getElementById("imageInp");
let saveBtn = document.getElementById("saveImage");
let previewImg = document.getElementById("previewImage");

let brightnessSlider = document.getElementById("brightnessRange");
let brightnessValue = document.getElementById("brightnessNumber");

let contrastSlider = document.getElementById("contrastRange");
let contrastValue = document.getElementById("contrastNumber");

let saturationSlider = document.getElementById("saturationRange");
let saturationValue = document.getElementById("saturationNumber");

let hueSlider = document.getElementById("hueRange");
let hueValue = document.getElementById("hueNumber");

let invertButton = document.getElementById("invert");

let resetButton = document.getElementById("reset");
let resetMenu = document.getElementById("resetMenu");
let cancelReset = document.getElementById("cancelButton");
let confirmReset = document.getElementById("resetButton");


openImage.addEventListener("change", function() {
  let file = openImage.files[0];
  previewImg.src = URL.createObjectURL(file);
})


function sliderUpdate() {
  brightnessValue.value = brightnessSlider.value;
  contrastValue.value = contrastSlider.value;
  saturationValue.value = saturationSlider.value;
  hueValue.value = hueSlider.value;

  if (invertButton.checked) {
    previewImg.style.filter = `brightness(${brightnessSlider.value}%) contrast(${contrastSlider.value}%) saturate(${saturationSlider.value}%) hue-rotate(${hueSlider.value}deg) invert(1)`;
  }
  else {
    previewImg.style.filter = `brightness(${brightnessSlider.value}%) contrast(${contrastSlider.value}%) saturate(${saturationSlider.value}%) hue-rotate(${hueSlider.value}deg) invert(0)`;
  }
}


function valueUpdate() {
  brightnessSlider.value = brightnessValue.value;
  contrastSlider.value = contrastValue.value;
  saturationSlider.value = saturationValue.value;
  hueSlider.value = hueValue.value;

  if (invertButton.checked) {
    previewImg.style.filter = `brightness(${brightnessSlider.value}%) contrast(${contrastSlider.value}%) saturate(${saturationSlider.value}%) hue-rotate(${hueSlider.value}deg) invert(1)`;
  }
  else {
    previewImg.style.filter = `brightness(${brightnessSlider.value}%) contrast(${contrastSlider.value}%) saturate(${saturationSlider.value}%) hue-rotate(${hueSlider.value}deg) invert(0)`;
  }

}


resetButton.addEventListener("click", function() {
  resetMenu.showModal();
})

cancelReset.addEventListener("click", function() {
  resetMenu.close();
})

confirmReset.addEventListener("click", function() {
  resetMenu.close();

  brightnessSlider.value = 100;
  contrastSlider.value = 100;
  saturationSlider.value = 100;
  hueSlider.value = 0;
  invertButton.checked = false;

  sliderUpdate();
})


saveBtn.addEventListener("click", function() {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  
  ctx.filter = invertButton.checked ? 
    previewImg.style.filter = `brightness(${brightnessSlider.value}%) contrast(${contrastSlider.value}%) saturate(${saturationSlider.value}%) hue-rotate(${hueSlider.value}deg) invert(1)`:
    previewImg.style.filter = `brightness(${brightnessSlider.value}%) contrast(${contrastSlider.value}%) saturate(${saturationSlider.value}%) hue-rotate(${hueSlider.value}deg) invert(0)`;

  ctx.drawImage(previewImg, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
  let a = document.createElement("a");
  a.href = canvas.toDataURL();
  a.download = "image-editor-download" + Math.round(Math.random() * 100000000000);
  a.click();
})

function reload() {
  window.location.reload();
}

