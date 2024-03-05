// const { resolveSoa } = require("dns");
const ArticleModel = require("../models/ArticleModel")

module.exports.getArticles = async (req, res) => {
    const articles = await ArticleModel.find();
    res.send(articles)
}


module.exports.saveArticle = async (req, res) => {
    try {
        const { title, description } = req.body
        const newPost = new ArticleModel({ title, description });
        await newPost.save()
        res.status(201).json({ message: "Post Saved succussfully" })
    }
    catch (error) {
        console.error("Error saving post:", error);
        res.status(500).json({ message: "Internal Server error" })
    }
};

module.exports.getArticleById =async (req, res) => {
    const article = await ArticleModel.findById(req.params.id)
    res.send(article)
  }



module.exports.updateArticle = async (req, res) => {
    try {
        const { title, description } = req.body
        const updatedPost = await ArticleModel.findByIdAndUpdate(req.params.id, { title, description }, { new: true })
        res.status(200).json({message: "Updated Successfully"});
    }
    catch (error) {
        console.error("Error updating post");
        res.status(500).json({ message: "Internal Server error" })
    }
}


module.exports.deleteArticle = async(req, res) => {
    const { id } = req.params
   await ArticleModel.findByIdAndDelete(id)
        .then(() => res.send("Deleted Successfully"))
        .catch((e) => {
            console.log(e);
            res.send({ error: err, msg: "Something went wrong" })
        })
}