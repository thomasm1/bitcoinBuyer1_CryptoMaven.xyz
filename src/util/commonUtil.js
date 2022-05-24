

//// FUNCTION /////// 
export function toUpperCase(str) {
    if (str) {
      return str.toUpperCase();
    }
    return str;
  }
  
  export function base64Encode(value) {
    if (value) {
      return btoa(value);
    }
    return value;
  }
  
  export function base64Decode(value) {
    if (value) {
      return atob(value);
    }
    return value;
  }

  export function capitalize(str) {
    str = str.split(" ");
  
    for (var i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
  
    return str.join(" ");
  }

//// CONST  /////// 
export const RegEx = {
    // email: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
    // email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/,
    email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    number: /^(\+{0,1}?[0-9]{1,3}-{0,1}? {0,1}?)?[0-9]{9,11}$/,
    address: /^[a-zA-Z\s\d.#:\-;,'\\ ]+$/,
    name: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    city: /^[a-zA-Z . 0-9]+$/,
    mobileNumber: /^(\+{0,1}?[0-9]{1,3}-{0,1}? {0,1}?)?[0-9]{9,11}$/,
    numberFormat: /^[0-9 ]+$/,
    message: /^[a-zA-Z\s\d . -]+$/,
    couponCode: /^[A-Z0-9-]+$/,
    password: /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/,
  };


  // VALIDATE
  export const validate = () => {
    const { emailId, password } = formData;
    let flag = true;            /// TRUE

    let validateEmail = appUtils.validateEmail(emailId);
    if (validateEmail === 1) {
      setErrorEmail({
        field: "emailId",
        message: "",
      });
    }
    if (!(validateEmail === 1)) {
      let msg = "";
      if (validateEmail === 0) {
        msg = "Please enter your email address.";
      } else {
        msg = "Oops doesn't look like an email address.";
      }
      setErrorEmail({
        field: "emailId",
        message: msg,
      });
      flag = false;      /// FALSE
    }

    // ? password
    if (password) {
      if (password.length < 8) {
        setErrorPassword({
          field: "password",
          message: "Your password is too short. It needs to be 8+ characters",
        });
        flag = false;                 /// FALSE
      }
      if (password.length > 8) {
        setErrorPassword({
          field: "password",
          message: "",
        });
        flag = true;            /// PASS <<<--------------------------------------
      }
    } else {
      setErrorPassword({
        field: "password",
        message: "Please enter your password.",
      });
      flag = false;            /// else
    }
    return flag;
  };