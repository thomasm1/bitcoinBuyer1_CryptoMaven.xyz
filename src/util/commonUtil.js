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
  