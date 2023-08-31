const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        { model: Category },
      ],
    })
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const productById = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Category,
        },
      ],
    });
    res.json(productById)
  } catch (error) {
    res.status(500).json(error);
  };
});

// create new product
router.post('/', async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//* ASK QUESTION REGARDING PUT
router.put('/:id', async (req, res) => {
  try {
    // Use Product.update() to update the product's properties
    const [updatedRowCount, [updatedProduct]] = await Product.update(req.body, {
      // Set the update condition using the product's ID from the URL
      where: {
        id: req.params.id,
      },
      // Instruct the update operation to return the updated row
      returning: true,
    });
    // Check if any rows were updated (if the product was found)
    if (updatedRowCount === 0) {
      // If no rows were updated, respond with a 404 error
      res.status(404).json({ message: 'No Product found with this id!' });
    } else {
      // If rows were updated, respond with the updated product's data
      res.status(200).json(updatedProduct);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!productData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
