export const createElement = (template) => {
  const wrapper = document.createElement(`div`);

  wrapper.innerHTML = template.trim();

  return wrapper;
};
