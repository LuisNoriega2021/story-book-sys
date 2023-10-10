import format from 'date-fns/format';
import Compressor from 'compressorjs';
import download from 'downloadjs';

import IItemListImg from '../interfaces/files/IItemListImg';

/**
 * Clase que agrupa funciones de archivos
 */
class Files {
	/**
	 * Toma el archivo y lo procesa
	 * @param file Archivo
	 * @param imageMaxSize tamaño máximo en byte permitido. Si sobrepasa se procede a reducir la imagen
	 * @param imageQuality La calidad de la imagen de salida. Debe ser un número entre 0 y 1.
	 * @returns IItemListImg
	 */
	static async proc(file: File | Blob, imageMaxSize: number, imageQuality: number): Promise<IItemListImg[]> {
		let imgValComp: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
		let compressor: Compressor;
		let ZIPfile: File | Blob;

		if (!file.type && !file.size) return [];

		if (file.size > imageMaxSize && imgValComp.indexOf((file.type || '').toLocaleLowerCase()) > -1) {
			ZIPfile = await new Promise<File | Blob>((resolve: (file: File | Blob) => void, reject: (error: any) => void) => {
				compressor = new Compressor(file, {
					quality: imageQuality,
					success: (fileComp: File | Blob) => resolve(fileComp),
				});

				console.log('🚀 ~ file: Files.ts ~ line 28 ~ Files ~ proc ~ compressor', compressor);
			});
		}

		let _file = ZIPfile ? ZIPfile : file;

		if (!_file || !file) return [];

		console.table({ original: { sizeKB: file.size / 1000 }, compressor: { sizeKB: _file.size / 1000 } });

		let readFile: string | ArrayBuffer | null = await new Promise<string | ArrayBuffer | null>(
			(
				resolve: (readerResult: string | ArrayBuffer | null) => void,
				reject: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null,
			) => {
				try {
					const reader = new FileReader();
					reader.onload = () => resolve(reader.result);
					reader.onerror = reject;
					reader.readAsDataURL(_file);
				} catch (e) {
					console.log('🚀 ~ file: Files.ts ~ line 51 ~ Files ~ proc ~ e', e);
				}
			},
		);

		if (!readFile) return [];

		if (typeof readFile === 'string')
			return [
				{
					datetime: format(new Date(), 'dd/MM/yyyy HH:mm:ss'),
					name: _file instanceof File ? _file.name : `zip-file-${format(new Date(), 'dd-MM-yyyy-HH:mm:ss')}`,
					type: readFile.split(';')[0].replace('data:', ''),
					size: Math.round(_file.size / 1000) + ' kB',
					uri: readFile,
				},
			];

		return [];
	}

	/**
	 * Esta función abre un archivo base64 en una ventana nueva del navegador
	 * @param name Nombre del archivo
	 * @param type Identifica el tipo MIME del archivo
	 * @param base64 Cadena base64
	 */
	static open(name: string, type: string, base64: string): void {
		try {
			const byteCharacters = atob(base64.substr(`data:${type};base64,`.length));
			const byteArrays = [];

			for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
				const slice = byteCharacters.slice(offset, offset + 1024);

				const byteNumbers = new Array(slice.length);

				for (let i = 0; i < slice.length; i++) {
					byteNumbers[i] = slice.charCodeAt(i);
				}

				byteArrays.push(new Uint8Array(byteNumbers));
			}

			const blob = new Blob(byteArrays, { type: type });
			const blobUrl = URL.createObjectURL(blob);

			window.open(blobUrl, '_blank');
		} catch (e: any) {
			const errores: any[] = [e];
			try {
				window.open(base64, '_blank');
			} catch (ex: any) {
				errores.push(ex);
			}
			errores.length > 1 && console.log('🚀 ~ file: Files.ts ~ line 108 ~ Files ~ open ~ errores', errores);
		}
	}

	/**
	 * La función se utiliza para activar la descarga de un archivo desde JavaScript.
	 * @param name Nombre del archivo
	 * @param type Identifica el tipo MIME del archivo
	 * @param base64 Cadena base64 o uri del archivo
	 */
	static download(name: string, type: string, base64: string): void {
		try {
			download(base64, name, type);
		} catch (e: any) {
			console.log('🚀 ~ file: Files.ts ~ line 116 ~ Files ~ download ~ e', e);
		}
	}
}

export default Files;
