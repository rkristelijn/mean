module.exports = (user, currentStrategy) => {
  if (user.google && currentStrategy !== 'google') {
    return { 'google.id': user.google.id };
  }
  if (user.facebook && currentStrategy !== 'facebook') {
    return { 'facebook.id': user.facebook.id };
  }
  if (user.github && currentStrategy !== 'github') {
    return { 'github.id': user.github.id };
  }
  if (user.linkedin && currentStrategy !== 'linkedin') {
    return { 'linkedin.id': user.linkedin.id };
  }
  if (user.twitter && currentStrategy !== 'twitter') {
    return { 'twitter.id': user.twitter.id };
  }

  return {};
};
