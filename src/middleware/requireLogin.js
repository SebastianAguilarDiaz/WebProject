// Sends the visitor to the login page when there is no active session.
export const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
    // For form actions, returnTo points to the page that owns the form.
    const target = (req.body && req.body.returnTo) || req.originalUrl;
    return res.redirect(`/login?redirect=${encodeURIComponent(target)}`);
  }
  next();
};
