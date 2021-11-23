class TextureContainer {
    constructor() {
        this.names = [];
        this.numOfTextures = 1;
        this.id = 0;
    }

    init() {
        this.initImageLoader();
        this.optionChangeHandler();
    }

    addTexture() {
        this.names.push('Texture ' + this.numOfTextures);
    }

    readImageFromFile(file) {
        let reader = new FileReader();

        reader.addEventListener('load', event => {
            let imgRawData = event.target.result;
            this.loadTexture(imgRawData, this.numOfTextures);
            this.numOfTextures++;
        });

        reader.addEventListener('error', function () {
            alert('File error happened!');
        });

        reader.readAsDataURL(file);
    }

    loadTexture(dataRaw, activeTextureNumber) {
        gl.activeTexture(gl.TEXTURE0 + activeTextureNumber);
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        const internalFormat = gl.RGBA;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;

        const image = new Image();

        image.onload = function () {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, srcFormat, srcType, image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        };

        image.src = dataRaw;
    }

    initImageLoader() {
        const textureLoad = document.getElementById('texture-load');

        textureLoad.addEventListener('change', () => {
            let selectedFile = textureLoad.files[0];

            this.readImageFromFile(selectedFile);
            textureLoad.value = "";
            this.addTexture();
            this.addOption();
        });
    }

    addOption() {
        const options = document.getElementById("select-texture");
        const element = this.names[this.names.length - 1];
        const option = document.createElement("option");
        option.innerHTML = element;
        option.value = element.slice(0, element.length - 2);
        options.appendChild(option);
    }

    optionChangeHandler() {
        const options = document.getElementById("select-texture");
        const objects = document.getElementById("select-object");

        document.getElementById("apply-texture").addEventListener("click", () => {
            const textureId = options.selectedIndex;
            const objId = objects.selectedIndex - 1;

            if (objId !== -1) {
                objs.container[objId].textureData = textureId;
            }
        });
    }
}