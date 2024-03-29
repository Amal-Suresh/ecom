const Category = require('../model/categoryModel')
const cloudinary = require('../utils/cloudnery')


// ------------------------------------------------Add Catetogy------------------------------------------------
const addCategory = async (req, res) => {
    try {
        console.log("entered add category")
        const existingCategory = await Category.findOne({ name: req.body.category })
        if (existingCategory) {
            res.status(200).json({ message: "Category already Exists" })
        }else{
            const imageData = req.file

            const result = await cloudinary.uploader.upload(imageData.path, { folder: 'category Image' });
            const image = result.secure_url
            const public_id = result.public_id
            const CategoryDetails = new Category({
                name: req.body.category,
                image: { image: image, public_id: public_id }
            })
            const category = await CategoryDetails.save()
            res.status(200).json({ message: "successfully category added",category })
        }
  
    } catch (error) {
        console.log("error : ", error.message)
    }
}
// ------------------------------------------------edit Catetogy------------------------------------------------

const editCategory = async (req, res) => {
    try {
        let image;
        let public_id;
        if (req.file){
            const CategoryData = await Category.findOne({_id:req.query.id})
            if(CategoryData.image.public_id){
                cloudinary.uploader
                .destroy(CategoryData.image.public_id)
            }
            const result = await cloudinary.uploader.upload(req.file.path, { folder: 'category Image' });
            image = result.secure_url
            public_id = result.public_id
            const updatedCategory = await Category.updateOne({ _id: req.query.id }, { $set: { name: req.body.name,  'image.image': image ,"image.public_id": public_id } })
        } else {
            const updatedCategory = await Category.updateOne({ _id: req.query.id }, { $set: { name: req.body.name } })
        }
        res.status(200).json({ message: "successfully category edited" })
    } catch (error) {
        console.log("error : ", error.message)

    }
}

// ------------------------------------------------list Catetogy------------------------------------------------


const listCategory = async (req, res) => {
    try {
        console.log("entered category listing")
        const data = await Category.findOne({_id:req.query.id})
        isBlockedVal = data.isBlocked
        console.log("isBlocked : ",isBlockedVal)
        console.log("data : ",data)
        const updatedCategory = await Category.updateOne({ _id: req.query.id },{$set:{isBlocked:!isBlockedVal}})
        res.status(200).json({ message: "status changed" ,success:true })
    } catch (error) {
        console.log("error : ", error.message)

    }
}



// ------------------------------------------------delete Catetogy------------------------------------------------

const deleteCategory = async (req, res) => {
    try {
        console.log("entered category removing")
        const updatedCategory = await Category.deleteOne({ _id: req.query.id })
        res.status(200).json({ message: "successfully deleted" })

    } catch (error) {
        console.log("error : ", error.message)

    }
}

// ------------------------------------------------get Catetogy------------------------------------------------

const getCategory = async (req, res) => {
    try {
        console.log("entered getCategory")
        const getCategory = await Category.find()
        console.log("getCategory : ",getCategory)
        res.status(200).json({ message: "Category list fetched",getCategory})
    } catch (error) {
        console.log("error : ", error.message)

    }
}
module.exports = {
    addCategory,
    editCategory,
    listCategory,
    deleteCategory,
    getCategory
}