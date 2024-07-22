const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = "./images";
const outputDir = "./resized";

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(inputDir, (err, files) => {
	if (err) {
		console.error("Błąd podczas czytania folderu:", err);
		return;
	}

	files.forEach(file => {
		const inputFilePath = path.join(inputDir, file);
		const outputFilePath = path.join(outputDir, file);

		sharp(inputFilePath)
			.resize(224, 224)
			.toFile(outputFilePath, err => {
				if (err) {
					console.error(`Błąd podczas zmiany rozmiaru zdjęcia ${file}:`, err);
				} else {
					console.log(
						`Zdjęcie ${file} zostało zmienione rozmiar i zapisane jako ${outputFilePath}`
					);
				}
			});
	});
});
