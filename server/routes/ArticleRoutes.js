const {Router} = require('express')

const {getArticles,saveArticle,updateArticle,deleteArticle,getArticleById} = require('../controllers/ArticleControllers')

const router = Router();

router.get('/get',getArticles);
router.get('/:id', getArticleById)
router.post('/save',saveArticle);
router.put('/update/:id',updateArticle);
router.delete('/delete/:id',deleteArticle);


module.exports=router;