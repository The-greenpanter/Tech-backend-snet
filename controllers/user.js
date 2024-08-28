import User from "../models/users.js";
import bcrypt from "bcrypt";
import { createToken } from "../services/jwt.js";
// Test Actions
export const testUser = (req, res) => {
  return res.status(200).json({ message: "Message send from user controller" });
};

// User Register Method

export const register = async (req, res) => {
  try {
    //Get params of request
    let params = req.body;
    // Debug with consol
    console.log(params);

    // Validate data obtained
    if (
      !params.name ||
      !params.last_name ||
      !params.email ||
      !params.password ||
      !params.nick_name
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "Missing fields" });
    }
    // Transfor to lowercase
    const email = params.email.toLowerCase();
    const nick_name = params.nick_name.toLowerCase();

    // Object to be store at the DB
    let newUser = new User(params);
    newUser.email = params.email.toLowerCase();
    // Control duplicated users
    const existingUser = await User.findOne({
      $or: [{ email: newUser.email }, { nick_name: newUser.nick_name }],
    });

    //If duplicate

    if (existingUser) {
      return res.status(409).send({
        status: "error",
        message: "User already exist!",
      });
    }

    // Code password
    const key = await bcrypt.genSalt(10); // make a has to make stare the decode
    const hashPassword = await bcrypt.hash(newUser.password, key); // apply the has to the password
    newUser.password = hashPassword;

    //  Save the user on DB

    await newUser.save();

    return res
      .status(200)
      .json({
        status: "success",
        message: "Register successfully made" /*, params,newUser*/,
      });

    // Return register user
  } catch (error) {
    console.error("Fail to register", error);
    return res.status(500).send({
      status: "Error",
      message: "Error issue with the register: ${error.message}",
    });
  }
};

// Login Method using JWT
export const login = async (req, res) => {
  try {
    // Obtener parámetros del cuerpo de la solicitud
    const params = req.body;
    console.log("Test", params);

    // Validar parámetros (email o nick_name y password)
    if ((!params.email && !params.nick_name) || !params.password) {
      return res
        .status(400)
        .send({ status: "error", message: "Missing login information" });
    }
    // Convert email and nick_name to lowercase
    const email = params.email ? params.email.toLowerCase() : null;
    const nick_name = params.nick_name ? params.nick_name.toLowerCase() : null;

    // Declarar variable de usuario
    let user;

    // Buscar usuario por email o nick_name
    if (params.email) {
      user = await User.findOne({ email });
    } else if (params.nick_name) {
      user = await User.findOne({ nick_name });
    }

    // Si no se encuentra el usuario
    if (!user) {
      return res
        .status(400)
        .send({ status: "error", message: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const confirmPassword = await bcrypt.compare(
      params.password,
      user.password
    );

    // Si la contraseña es inválida
    if (!confirmPassword) {
      return res
        .status(400)
        .send({ status: "error", message: "Password incorrecto" });
    }

    // Crear Token de autenticación (pendiente de implementar)
    const token = createToken(user);
    // Retornar token de autenticación junto con el perfil del usuario
    return res
      .status(200)
      .json({ status: "success", message: "Login exitoso", token, user });
  } catch (error) {
    // Manejo de errores
    console.log("Error de autenticación", error);
    return res.status(500).send({
      status: "error",
      message:
        "Error de autenticación, por favor ingresa un email o password valid",
    });
  }
};

// Method to show User profile

export const profile = async (req, res) => {
  try {
    // Get the user ID from http request
    const userID = req.params.id;
    console.log(userID);
    // Search user on DB excluding data we dont want to share
    const user = await User.findById(userID).select(
      "-password -role -email -_v"
    );
    // If user do not exist
    if (!user) {
      return res.status(404).send({
        status: "error",
        message: `No existe la entidad con el ID ${entityId}`,
      });
    }
    return res.status(200).json({ message: "Profile method", user });
  } catch (error) {
    console.log("Error to get the user profile", error);
    return res.status(500).send({
      status: "error",
      message:
        "Error de autenticación, por favor ingresa un email o password valid",
    });
  }
};

// User list users using pagination
export const listUsers = async (req, res) => {
  try {
    // Manage pages

    //Manage current page
    let page = req.params.page ? parseInt(req.params.page) : 1;
    // Config items per page
    let itemsPerPage = req.query.limit ? parseInt(req.query.limit) : 3;
    // Made paginate request
    const options = {
      page: page,
      limit: itemsPerPage,
      select: "-password -email -role -__v",
    };
    const users = await User.paginate({}, options);

    // if there are not avalible users
    if (!users || users.docs.length === 0) {
      return res.status(404).send({
        status: "error",
        message: "No existen usuarios disponibles",
      });
    }
    // return
    return res.status(200).json({  status: "success",
      users: users.docs,
      totalDocs: users.totalDocs,
      totalPages: users.totalPages,
      Currentpage: users.page
      });
  } catch (error) {
    console.log("Error listing the users", error);
    return res
      .status(500)
      .send({
        status: "error",
        message: "Error getting the user profile",
        error,
      });
  }
};
