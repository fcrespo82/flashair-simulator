


async function test(params) {
	console.log(`This is an async function with ${params}`)
	return new Promise((resolve, reject) => {
		resolve(params)
	})
}


async function main() {

	var result = await test("Opa")

	result.then((a, b) => {
		console.log(a)
	})
}

main(); 