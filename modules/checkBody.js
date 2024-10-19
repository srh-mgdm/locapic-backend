function checkBody(body, keys) { //body: is an object contains the data comes from user  یک آبجکت است که شامل داده‌هایی است که باید بررسی شوند (مثلاً داده‌هایی که از کاربر می‌آیند).
    //keys: یک آرایه از رشته‌هایی است که کلیدهایی را مشخص می‌کند که باید در بادی وجود داشته باشند.
  let isValid = true;

  for (const field of keys) {
    if (!body[field] || body[field] === '') {
      isValid = false;
    }
  }

  return isValid;
}

module.exports = { checkBody };
