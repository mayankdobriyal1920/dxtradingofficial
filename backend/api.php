<?php
require_once 'stripe-php/init.php';

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
function insertBuyProductAndSendEmail($data) {

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
    $monthPrice  = $data["month_price"];
    $yearPrice  = $data["year_price"];
    $otherLink  = $data["other_link"];
    $show_paid_button  = $data["show_paid_button"];
    $show_free_button  = $data["show_free_button"];
    $show_download_button  = $data["show_download_button"];

    $sql = "INSERT INTO product (name, description, price,month_price,year_price, url,other_link, file_name,show_paid_button,show_free_button,show_download_button) VALUES (:name, :description, :price, :month_price,:year_price, :url,:other_link, :file_name,:show_paid_button,:show_free_button,:show_download_button)";
    $stmt = $pdo->prepare($sql);

    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":description", $description);
    $stmt->bindParam(":price", $price);
    $stmt->bindParam(":url", $url);
    $stmt->bindParam(":file_name", $fileName);
    $stmt->bindParam(":month_price", $monthPrice);
    $stmt->bindParam(":year_price", $yearPrice);
    $stmt->bindParam(":other_link", $otherLink);
    $stmt->bindParam(":show_paid_button", $show_paid_button);
    $stmt->bindParam(":show_free_button", $show_free_button);
    $stmt->bindParam(":show_download_button", $show_download_button);

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
function getStripeIntend($id) {
    $pdo = connectToDatabase();
    $token = rand(100,100000);
    $sql = "UPDATE product SET token = :token WHERE id = :id";
    $stmt = $pdo->prepare($sql);

    $stmt->bindParam(":id", $id);
    $stmt->bindParam(":token", $token);

    if ($stmt->execute()) {
        $sql = "select * FROM product WHERE id = ".$id;
        $stmt = $pdo->query($sql);
        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        $price = 0;
        if($product['subscription'] == 'monthly'){
            $price = $product['month_price'];
        }elseif($product['subscription'] == 'yearly'){
            $price = $product['year_price'];
        }else{
            $price = $product['price'];
        }
        try {
            $stripe = new \Stripe\StripeClient('sk_test_51ME77cSIFtW1VSPuJqLQWVmK1vmdptG6j457wJlQv98NeRnB2eAdwkbQYWwlNfVIrtuRbNFPZsbKyafCQwdZuT1300SgcSS7AB');
            $paymentIntent = $stripe->paymentIntents->create([
                'amount' => $price,
                'currency' => 'usd',
                'payment_method_types' => ['card'],
            ]);
            // Return the client secret to the frontend
            sendResponse(200, ["clientSecret" => $paymentIntent->client_secret]);
        } catch (\Stripe\Exception\ApiErrorException $e) {
            // Handle Stripe API errors
            sendResponse(500, ["error" => "Failed to load intent strip" ,"message" => $e]);
        }
    } else {
        sendResponse(500, ["error" => "Failed to load intent strip"]);
    }
}

// Check the request method
$method = $_SERVER["REQUEST_METHOD"];

if ($method === "GET") {
    if (isset($_GET["file_name"])) {
        $file_path = 'uploads/'.$_GET["file_name"];
        $file_name = $_GET["file_name"];

        if (file_exists($file_path)) {
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream'); // Set the appropriate content type
            header('Content-Disposition: attachment; filename='.$file_name);
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($file_path));
            readfile($file_path);
            exit;
        }else{
            echo 'File not found';
        }
    } else {
        getProducts();
    }
} elseif ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    // Check the specific API endpoint to determine the action
    if ($_POST["endpoint"] === "insert") {
        insertProduct($_POST);
    }elseif ($data["endpoint"] === "login") {
        loginUser($data);
    }elseif ($data["endpoint"] === "getintend") {
        getStripeIntend($data["id"]);
    }elseif ($data["endpoint"] === "publishkey") {
        sendResponse(200, ["publishableKey" => 'pk_test_51ME77cSIFtW1VSPuewmIrcC2SSgHZi0ad2OuqicbcRiVpBRkRyVByCFEaIyb067eFhQL0GXaWVakkkZt5TuLFo6J005HlqBOck']);
    }elseif ($data["endpoint"] === "success_buy") {
        insertBuyProductAndSendEmail($_POST);
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

