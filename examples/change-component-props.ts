type ButtonProps<T extends 'link' | 'button'> = T extends 'link'
  ? { href: string; label: string }
  : { onClick: () => void; label: string };

function Button<T extends 'link' | 'button'>(props: ButtonProps<T>) {
  if ('href' in props) {
    return `<a href="${props.href}">${props.label}</a>`;
  } else {
    return `<button>${props.label}</button>`;
  }
}

const linkButton = Button({ href: '/home', label: 'Go Home' });
console.dir(linkButton)
const normalButton = Button({ onClick: () => alert('Clicked!'), label: 'Click Me' });
console.dir(normalButton)