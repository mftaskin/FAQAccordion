const pxAccordion = (elementSelector, defaultOpen) => {
  const selectedElements = document.querySelectorAll(elementSelector);
  selectedElements.forEach( function(item) {
    pxAccordionInit(item, defaultOpen);
  });
};
function pxAccordionInit(element, defaultOpen) {
  const selectedElement = element;
  const accHeads = selectedElement.querySelectorAll(
    ".px-acc-item .px-acc-head"
  );
  accHeads.forEach((headItem) => {
    headItem.addEventListener("click", function() {
      const accItem = headItem.parentElement;
      const accBody = headItem.nextElementSibling;
      let accBodyHeight = accBody.scrollHeight;

      accBody.addEventListener("transitionend", function() {
        if (accItem.classList.contains("active")) accBody.style.height = "auto";
      });
      accItem.classList.toggle("active");
      if (accItem.classList.contains("active")) {
        accBody.style.height = accBodyHeight + "px";
      } else {
        requestAnimationFrame(function() {
          accBodyHeight = accBody.scrollHeight;
          accBody.style.height = accBodyHeight + "px";
          requestAnimationFrame(function() {
            accBody.style.height = 0 + "px";
          });
        });
      }
    });
    headItem.addEventListener('keydown', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        headItem.click();
      }
    });
  });
  accHeads[defaultOpen].click();
};
pxAccordion("#faqacc", 0);