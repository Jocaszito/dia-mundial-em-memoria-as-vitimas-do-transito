class Galeria {
    constructor() {
        this.posts = [];
    }

    adicionarPost(titulo, descricao, arquivo) {
        // Usando radix para transformar a data em número
        const data = new Date();
        const dataConvertida = parseInt(data.getTime(), 10); // Convertendo timestamp para base 10 (em milissegundos)

        const post = {
            titulo,
            descricao,
            arquivo,
            data: dataConvertida
        };
        this.posts.push(post);
        this.ordenarPosts();
        this.atualizarGaleria();
    }

    ordenarPosts() {
        // Agora a ordenação será feita com base nos valores numéricos das datas
        this.posts.sort((a, b) => b.data - a.data);
    }

    atualizarGaleria() {
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '';
        this.posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h3>${post.titulo}</h3>
                <p>${post.descricao}</p>
                ${this.renderizarArquivo(post.arquivo)}
            `;
            gallery.appendChild(postElement);
        });
    }

    renderizarArquivo(arquivo) {
        const fileType = arquivo.type.split('/')[0];
        if (fileType === 'image') {
            return `<img src="${URL.createObjectURL(arquivo)}" alt="Imagem">`;
        } else if (fileType === 'video') {
            return `<video controls><source src="${URL.createObjectURL(arquivo)}" type="${arquivo.type}">Seu navegador não suporta vídeo.</video>`;
        }
        return '';
    }
}

const galeria = new Galeria();

document.getElementById('postForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const titulo = document.getElementById('title').value;
    const descricao = document.getElementById('description').value;
    const arquivo = document.getElementById('fileInput').files[0];

    galeria.adicionarPost(titulo, descricao, arquivo);

    // Limpar o formulário após o envio
    document.getElementById('postForm').reset();
});


