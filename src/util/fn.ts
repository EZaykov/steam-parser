export function timeout(amount: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, amount));
}
