import Material from './material.model.js';

export const crearMaterial = async (req, res) => {
  try {
    const { title, description, category, content, level } = req.body;
    const createdBy = req.usuario.id;

    if (!title || !description || !category || !content || !level) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const nuevoMaterial = new Material({
      title,
      description,
      category,
      content,
      level,
      createdBy,
    });

    await nuevoMaterial.save();

    return res.status(201).json({
      message: 'Material creado exitosamente',
      material: nuevoMaterial,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error al crear el material',
      error: error.message,
    });
  }
};

export const editarMaterial = async (req, res) => {
  try {
    const { materialId } = req.params;
    const { title, description, category, content, level } = req.body;

    const material = await Material.findById(materialId);
    if (!material) {
      return res.status(404).json({ message: 'Material no encontrado' });
    }

    if (title !== undefined) material.title = title;
    if (description !== undefined) material.description = description;
    if (category !== undefined) material.category = category;
    if (content !== undefined) material.content = content;
    if (level !== undefined) material.level = level;

    await material.save();

    return res.status(200).json({
      message: 'Material actualizado correctamente',
      material,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error al actualizar el material',
      error: error.message,
    });
  }
};

export const listarMateriales = async (req, res) => {
  try {
    const materiales = await Material.find({ estado: true }).populate('createdBy', 'name username');

    return res.status(200).json({
      message: 'Lista de materiales obtenida exitosamente',
      materiales,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error al obtener la lista de materiales',
      error: error.message,
    });
  }
};

export const eliminarMaterial = async (req, res) => {
  try {
    const { materialId } = req.params;

    const material = await Material.findById(materialId);
    if (!material) {
      return res.status(404).json({ message: 'Material no encontrado' });
    }

    material.estado = false;
    await material.save();

    return res.status(200).json({
      message: 'Material desactivado correctamente',
      material,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error al desactivar el material',
      error: error.message,
    });
  }
};


export const buscarMateriales = async (req, res) => {
  try {
    const { q } = req.query;

    const materiales = await Material.find({
      $or: [
        { title: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
      ],
    });

    return res.status(200).json({
      message: 'Materiales encontrados',
      materiales,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error al buscar los materiales',
      error: error.message,
    });
  }
};