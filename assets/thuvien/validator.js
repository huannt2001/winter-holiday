
// function Validator(formSelector) {
//     var _this = this;
//     // Khai báo ra một object có key=name và value=rules
//     var formRules = {
//         // fullname: 'required',
//         // email: 'required|email'
//     };

//     function getParent(element, selector) {
//         while (element.parentElement) {
//             if (element.parentElement.matches(selector)) {
//                 return element.parentElement;
//             }
//             element = element.parentElement;
//         }
//     }

//     /**
//      *  Quy ước tạo rule:
//      * - Nếu có lỗi thì return `error message`
//      * - Nếu không có lỗi thì return `undefined`
//      */
//     var validatorRules = {
//         required: function (value) {
//             return value ? undefined : 'Vui lòng nhập trường này';
//         },
//         email: function (value) {
//             var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//             return regex.test(value) ? undefined : 'Trường này phải là email';
//         },
//         min: function (min) {
//             return function (value) {
//                 return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} kí tự`;
//             }
//         },
//         max: function (max) {
//             return function (value) {
//                 return value.length <= max ? undefined : `Vui lòng nhập tối đa ${max} kí tự`;
//             }
//         },
//     }

//     // Lấy ra form element trong DOM theo `formSelector`(#register-form)
//     var formElement = document.querySelector(formSelector);

//     // Chỉ xử lý khi có element trong DOM
//     if (formElement) { 

//         // Lấy ra các thẻ input có thuộc tính name và rules
//         var inputs = formElement.querySelectorAll('[name][rules]');
//         for (var input of inputs) {
//             var rulesInput = input.getAttribute('rules').split('|');
//             // console.log(rulesInput)
//             for (var rule of rulesInput) {
//                 var isRuleHasValue = rule.includes(':');
//                 var ruleInfo;

//                 if (isRuleHasValue) {
//                     ruleInfo = rule.split(':');
//                     rule = ruleInfo[0];
//                     console.log(ruleInfo)

//                     // console.log(validatorRules[rule](ruleInfo[1]));
//                 }

//                 var ruleFunc = validatorRules[rule];

//                 if (isRuleHasValue) {
//                     ruleFunc = ruleFunc(ruleInfo[1]);
//                 }

//                 if (Array.isArray(formRules[input.name])) {
//                     formRules[input.name].push(ruleFunc);
//                 } else {
//                     formRules[input.name] = [ruleFunc];
//                 }
//             }

//             // Lắng nghe sự kiện để validate(blur, onchange,...)

//             input.onblur = handleValidate;
//             input.oninput = handleClearError;


//         }

//         // Hàm thực hiện validate
//         function handleValidate(event) {
//             // event.target.name = input.name = key của formValues
//             var rules = formRules[event.target.name]
//             var errorMessage;

//             for (var rule of rules) {
//                 errorMessage = rule(event.target.value);
//                 if (errorMessage) break;
//             }

//             // rules.find(function(rule) {
//             //     switch(event.target.type) {
//             //         case 'radio':
//             //         case 'checkbox': {
//             //             errorMessage = rule(formElement.querySelector(event.target.name + ':checked'));
//             //             break;
//             //         }
//             //         default: 
//             //     }
//             //     return errorMessage;
//             // });

//             // Nếu có lỗi thì hiển thị ra UI
//             if (errorMessage) {
//                 var formGroup = getParent(event.target, '.form-group');
//                 if (formGroup) {
//                     formGroup.classList.add('invalid');

//                     var formMessage = formGroup.querySelector('.form-message');
//                     if (formMessage) {
//                         formMessage.innerText = errorMessage;
//                     }
//                 }
//             }
//             return !errorMessage;
//         }

//         // Hàm clear error message khi nhập input
//         function handleClearError(event) {
//             var formGroup = getParent(event.target, '.form-group');

//             if (formGroup.classList.contains('invalid')) {
//                 formGroup.classList.remove('invalid');

//                 var formMessage = formGroup.querySelector('.form-message');
//                 if (formMessage) {
//                     formMessage.innerText = '';
//                 }
//             }
//         }

//     }

//     // Xử lý hành vi submit form
//     formElement.onsubmit = function (event) {
//         event.preventDefault();
//         console.log(_this)

//         var inputs = formElement.querySelectorAll('[name][rules]');
//         var isValid = true;

//         for (var input of inputs) {
//             if (!handleValidate({target: input})) {
//                 isValid = false;
//             }
//         }

//         // Khi không có lỗi thì submit form
//         if (isValid) {
//             if (typeof _this.onSubmit === 'function') {
//                 var enableInputs = formElement.querySelectorAll('[name]');
//                 var formValues = Array.from(enableInputs).reduce(function (values, input) {
//                     switch (input.type) {
//                         case 'radio': {
//                             if (input.matches(':checked')) {
//                                 values[input.name] = input.value;
//                             }
//                         }
//                         case 'checkbox': {
//                             // values[input.name] = [];
//                             if (!input.matches(':checked')) {
//                                 values[input.name] = '';
//                                 return values;
//                             }
//                             if (!Array.isArray(values[input.name])) {
//                                 values[input.name] = [];
//                             }
//                             values[input.name].push(input.value);
//                             break;
//                         }
//                         case 'file': {
//                             values[input.name] = input.files;
//                             break;
//                         }
//                         default:
//                             values[input.name] = input.value;
//                     }
//                     return values;
//                 }, {})
//                 _this.onSubmit(formValues);

//             } else {
//                 formElement.submit();
//             }
//         }
//     }
// }


function Validator(formSelector) {
    var _this = this;
    var formRules = {};

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }

            element = element.parentElement;

        }
    }

    var validatorRules = {
        required: function (value) {
            return value ? undefined : 'Vui lòng nhập trường này';
        },
        email: function (value) {
            var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return regex.test(value) ? undefined : 'Trường này phải là email';
        },
        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} kí tự`
            }
        }
    }

    var formElement = document.querySelector(formSelector);

    if (formElement) {

        var inputs = formElement.querySelectorAll('[name][rules]');

        for (var input of inputs) {
            var rules = input.getAttribute('rules').split('|');

            for (var rule of rules) {
                var isRuleHasValue = rule.includes(':');
                var ruleInfo;

                if (isRuleHasValue) {
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }

                var ruleFunc = validatorRules[rule];

                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }


                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }

            }

            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }
    }

    function handleValidate(event) {
        var rules = formRules[event.target.name];
        var errorMessage;

        for (var rule of rules) {
            errorMessage = rule(event.target.value);
            if (errorMessage) break;
        }

        if (errorMessage) {
            var formGroup = getParent(event.target, '.form-group');
            if (formGroup) {
                formGroup.classList.add('invalid');

                var formMessage = formGroup.querySelector('.form-message');
                if (formMessage) {
                    formMessage.innerText = errorMessage;
                }
            }
        }
        return !errorMessage;
    }

    function handleClearError(event) {
        var formGroup = getParent(event.target, '.form-group');
        if (formGroup.classList.contains('invalid')) {
            formGroup.classList.remove('invalid');

            var formMessage = formGroup.querySelector('.form-message');
            if (formMessage) {
                formMessage.innerText = '';
            }
        }
    }

    // Xử lí khi submit form
    formElement.onsubmit = function (event) {
        event.preventDefault();

        var inputs = formElement.querySelectorAll('[name][rules]');
        var isValid = true;

        for (var input of inputs) {
            if (!handleValidate({ target: input })) {
                isValid = false;
            }
        }

        if (isValid) {
            if (typeof _this.onSubmit === 'function') {
                var enableInputs = formElement.querySelectorAll('[name]');

                var formValues = Array.from(enableInputs).reduce(function (values, input) {
                    switch (input.type) {
                        case 'radio': {
                            if (input.matches(':checked')) {
                                values[input.name] = input.value;
                            }
                            break;
                        }
                        case 'checkbox': {
                            // values[input.name] = [];
                            if (!input.matches(':checked')) {
                                values[input.name] = '';
                                return values;
                            }
                            if (!Array.isArray(values[input.name])) {
                                values[input.name] = [];
                            }
                            values[input.name].push(input.value);
                            break;
                        }
                        case 'file': {
                            values[input.name] = input.files;
                            break;
                        }
                        default:
                            values[input.name] = input.value;
                    }
                    return values;
                }, {})
                _this.onSubmit(formValues);
            } else {
                formElement.submit();
            }
        }
    }
}
