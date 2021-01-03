export function clickOutside(node: HTMLElement) {
	function handleClick(event: MouseEvent) {
    if (node === event.target) return;

    if (node.contains(event.target as Node)) return;

    node.dispatchEvent(new CustomEvent('clickoutside'));
	}

  // delay adding so it doesn't immediately fire
  setTimeout(() => {
    window.addEventListener('click', handleClick);
  }, 50);

	return {
		destroy() {
			window.removeEventListener('click', handleClick);
		}
	};
}