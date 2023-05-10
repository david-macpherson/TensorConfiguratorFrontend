
export class Variant {
	private variants = new Map<
		string, string
	>();

	constructor(variants: Map<string, string>) {
		this.variants = variants;
	}

	populateVariants(elem: HTMLElement, onClickFn: (index: number) => any): void {
		[...this.variants.keys()].forEach((key, index) => {
			const variantContainer = document.createElement('div');
			variantContainer.classList.add('variant-container')
			variantContainer.onclick = () => {
				onClickFn(index);
			}
			const image = document.createElement('img');
			image.src = this.variants.get(key);
			image.alt = key;
			image.classList.add('variant-image');

			const descriptor = document.createElement('div');
			descriptor.classList.add('variant-descriptor');
			descriptor.innerHTML = key;

			variantContainer.appendChild(image);
			variantContainer.appendChild(descriptor);
			
			elem.appendChild(variantContainer);
		})
	}
}