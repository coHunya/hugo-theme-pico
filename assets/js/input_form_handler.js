try {
    let formElements = getFormElements();
    let asterisk = '<span class="text-red-500 font-normal">*</span>';

    formElements.checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            handleCheckboxChange(this, formElements, asterisk);
        });
    });

    // Manually trigger a 'change' event on each checkbox when the reset is clicked
    let resetBtn = document.querySelector('input[type="reset"]');
    resetBtn.addEventListener('click', function () {
        setTimeout(function () {
            formElements.checkboxes.forEach(function (checkbox) {
                checkbox.dispatchEvent(new Event('change'));
            });
        }, 0);
    });
} catch (error) {
    console.error(error);
}

function getFormElements() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let placeBirth = document.querySelector('input[name="place_birth"]');
    let dateBirth = document.querySelector('input[name="date_birth"]');
    let message = document.querySelector('textarea[name="message"]');
    let otherCheckbox = document.querySelector('input[name="other"]');

    let placeBirthLabel = document.querySelector('label[for="place_birth"]');
    let dateBirthLabel = document.querySelector('label[for="date_birth"]');
    let messageLabel = document.querySelector('label[for="message"]');

    if (!checkboxes || !placeBirth || !dateBirth || !message || !placeBirthLabel || !dateBirthLabel || !messageLabel || !otherCheckbox) {
        throw new Error('One or more elements are missing from the document.');
    }

    return {
        checkboxes: checkboxes,
        placeBirth: placeBirth,
        dateBirth: dateBirth,
        message: message,
        placeBirthLabel: placeBirthLabel,
        dateBirthLabel: dateBirthLabel,
        messageLabel: messageLabel,
        otherCheckbox: otherCheckbox
    };
}

function handleCheckboxChange(checkbox, formElements, asterisk) {
    if (checkbox.name === 'other' && checkbox.checked) {
        handleOtherCheckboxSelected(formElements, asterisk);
    } else if (checkbox.checked) {
        handleOtherCheckboxDeselected(formElements, asterisk);
    }

    // Check if no checkbox is selected
    let isAnyCheckboxChecked = Array.from(formElements.checkboxes).some(function (box) {
        return box.checked;
    });

    if (!isAnyCheckboxChecked) {
        removeAsterisks(formElements, asterisk);
    }
}

function handleOtherCheckboxSelected(formElements, asterisk) {
    formElements.placeBirth = false;
    formElements.dateBirth = false;
    formElements.message = true;

    formElements.placeBirthLabel.innerHTML = formElements.placeBirthLabel.innerHTML.replace(asterisk, '');
    formElements.dateBirthLabel.innerHTML = formElements.dateBirthLabel.innerHTML.replace(asterisk, '');
    if (!formElements.messageLabel.innerHTML.includes(asterisk)) {
        formElements.messageLabel.innerHTML += asterisk;
    }

    formElements.checkboxes.forEach(function (box) {
        if (box.name !== 'other') {
            box.checked = false;
        }
    });
}

function handleOtherCheckboxDeselected(formElements, asterisk) {
    formElements.placeBirth = true;
    formElements.dateBirth = true;
    formElements.message = false;

    if (!formElements.placeBirthLabel.innerHTML.includes(asterisk)) {
        formElements.placeBirthLabel.innerHTML += asterisk;
    }
    if (!formElements.dateBirthLabel.innerHTML.includes(asterisk)) {
        formElements.dateBirthLabel.innerHTML += asterisk;
    }
    formElements.messageLabel.innerHTML = formElements.messageLabel.innerHTML.replace(asterisk, '');

    formElements.otherCheckbox.checked = false;
}

function removeAsterisks(formElements, asterisk) {
    formElements.placeBirthLabel.innerHTML = formElements.placeBirthLabel.innerHTML.replace(asterisk, '');
    formElements.dateBirthLabel.innerHTML = formElements.dateBirthLabel.innerHTML.replace(asterisk, '');
    formElements.messageLabel.innerHTML = formElements.messageLabel.innerHTML.replace(asterisk, '');
}
