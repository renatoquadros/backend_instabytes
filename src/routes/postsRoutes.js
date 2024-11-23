import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos enviados pelo usuário
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos
  destination: function(req, file, cb){
    cb(null, "uploads/");
  },
  // Define o nome do arquivo no destino
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

// Cria um objeto de upload utilizando o armazenamento configurado
const upload = multer({dest:"./uploads", storage});

// Função que define as rotas da aplicação
const routes = (app) => {
  // Habilita o middleware para analisar corpos de requisições JSON
  app.use(express.json());
  app.use(cors(corsOptions));

  // Rota para listar todos os posts
  app.get("/posts", listarPosts);

  // Rota para criar um novo post
  app.post("/posts", postarNovoPost);

  // Rota para fazer upload de uma imagem
  // O middleware `upload.single('imagem')` extrai o arquivo enviado com o nome 'imagem'
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

export default routes;