const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//* ASK ABOUT WHAT TO MODEL TO REFERENCE WITHIN INCLUDE STATEMENT
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll()
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//* ASK ABOUT WHAT MODEL TO REFERENCE WITHIN WHERE/INCLUDE STATEMENT
router.get('/:id', async (req, res) => {
  try {
    const tagById = await Tag.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(tagById)
  } catch (error) {
    res.status(500).json(error);
  };
});

//* ASK ABOUT NULL VALUE WHEN CREATING A NEW TAG
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//* ASK ABOUT PUT REQUEST CREATION
router.put('/:id', (req, res) => {

});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
