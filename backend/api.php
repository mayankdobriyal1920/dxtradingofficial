

<?php
// Set appropriate headers for CORS (Cross-Origin Resource Sharing)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Function to send a JSON response
function sendResponse($status, $data = null) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

// Database configuration
$db_host = "localhost";
$db_user = "u533844746_dxtrading";
$db_password = '9ZDw6D2euK$f';
$db_name = "u533844746_dxtrading";

// Function to establish a database connection using PDO
function connectToDatabase() {
    global $db_host, $db_user, $db_password, $db_name;

    $dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4";

    try {
        $pdo = new PDO($dsn, $db_user, $db_password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        sendResponse(500, ["error" => "Failed to connect to the database"]);
    }
}

// Function to handle GET request (fetch all users)
function getProducts() {
    $pdo = connectToDatabase();

    $sql = "SELECT * FROM product";
    $stmt = $pdo->query($sql);

    if (!$stmt) {
        sendResponse(500, ["error" => "Failed to fetch users"]);
    }

    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    sendResponse(200, $products);
}

// Function to handle POST request (insert user)
function loginUser($data) {
    if (empty($data["password"])){
        sendResponse(400, ["error" => "password required"]);
    }
    if($data["password"] == 'test123'){
        sendResponse(200, ["name" => "Dx Official","email" => "dxofficialtrading@gmail.com","status" => 1]);
    }else{
        sendResponse(200, ["status" => 0]);
    }
}
function insertProduct($data) {
    // Validate the data (you can add more validation as needed)
    if (empty($data["name"]) || empty($data["description"]) || empty($data["price"]) || empty($data["url"]) || empty($_FILES["file"])) {
        sendResponse(400, ["error" => "Field required"]);
    }

    $uploadDir = "uploads/";
    $fileName = rand(1, 10000) . $_FILES["file"]["name"];
    $uploadFile = $uploadDir . basename($fileName);
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $uploadFile)) {
        echo json_encode(["message" => "File uploaded successfully"]);
    } else {
        echo json_encode(["error" => "Failed to upload file"]);
    }

    $pdo = connectToDatabase();
    $name = $data["name"];
    $description = $data["description"];
    $price = $data["price"];
    $url  = $data["url"];

    $sql = "INSERT INTO product (name, description, price, url, file_name) VALUES (:name, :description, :price, :url, :file_name)";
    $stmt = $pdo->prepare($sql);

    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":description", $description);
    $stmt->bindParam(":price", $price);
    $stmt->bindParam(":url", $url);
    $stmt->bindParam(":file_name", $fileName);

    if ($stmt->execute()) {
        sendResponse(201, ["message" => "Product inserted successfully"]);
    } else {
        sendResponse(500, ["error" => "Failed to insert user"]);
    }
}

// Function to handle DELETE request (delete user)
function deleteProduct($id) {
    $pdo = connectToDatabase();

    $sql = "DELETE FROM product WHERE id = :id";
    $stmt = $pdo->prepare($sql);

    $stmt->bindParam(":id", $id);

    if ($stmt->execute()) {
        sendResponse(200, ["message" => "Product deleted successfully"]);
    } else {
        sendResponse(500, ["error" => "Failed to delete user"]);
    }
}

// Function to handle file upload
function uploadFile() {
    // Implement the file upload logic here and handle any errors
    // You can use $_FILES["file"] to access the uploaded file information
    // Example: move_uploaded_file($_FILES["file"]["tmp_name"], "uploads/" . $_FILES["file"]["name"]);
    // After successful upload, you can store the file information in the database or perform any other actions.
    // Send a response back to the client based on the upload status.
}

// Check the request method
$method = $_SERVER["REQUEST_METHOD"];

if ($method === "GET") {
    getProducts();
} elseif ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    // Check the specific API endpoint to determine the action
    if ($_POST["endpoint"] === "insert") {
        insertProduct($_POST);
    }elseif ($data["endpoint"] === "login") {
        loginUser($data);
    }
} elseif ($method === "DELETE") {
    // Assuming the user ID is passed in the query string as "?id=USER_ID"
    $id = $_GET["id"] ? $_GET["id"] : null;
    if ($id !== null) {
        deleteProduct($id);
    } else {
        sendResponse(400, ["error" => "Product ID is required"]);
    }
}
?>

