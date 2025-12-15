<?php
include './head.php';
include './side-bar.php';
include './header.php';
?>

<div class="main_content_iner ">
    <div class="container-fluid p-0">
        <div class="row justify-content-center">
            <div class="col-lg-12">
                <div class="white_box mb_30">
                    <div class="box_header ">
                        <div class="main-title">
                            <h3 class="mb-0">My Profile</h3>
                        </div>
                    </div>
                    <?php
                    if (isset($_POST['submit'])) {
                        $fname = mysqli_real_escape_string($conn, htmlentities($_POST['fname']));
                        $lname = mysqli_real_escape_string($conn, htmlentities($_POST['lname']));
                        $email = mysqli_real_escape_string($conn, htmlentities($_POST['email']));
                        $password = mysqli_real_escape_string($conn, htmlentities(md5($_POST['password'])));

                        if (empty($password)) {
                            //query
                            $query2 = "UPDATE `users` SET `firstname`='$fname',`surname`='$lname',`email`='$email' WHERE `uid`='$user'";
                            if ($run2 = mysqli_query($conn, $query2)) {
                                ?>
                                <script type="text/javascript">
                                    document.addEventListener("DOMContentLoaded", function(event) {
                                        swal("", "Details Were Successfully Updated", "success");
                                        setTimeout(function() {
                                            window.location = 'profile.php'
                                        }, 2000);
                                    });
                                </script>
                            <?php
                            } else {
                                die(mysqli_error($conn));
                            }
                        } else {
                            //query
                            $query2 = "UPDATE `users` SET `firstname`='$fname',`surname`='$lname',`email`='$email', `password`='$password' WHERE `uid`='$user'";
                            if ($run2 = mysqli_query($conn, $query2)) {
                            ?>
                                <script type="text/javascript">
                                    document.addEventListener("DOMContentLoaded", function(event) {
                                        swal("", "Settings Were Successfully Updated", "success");
                                        setTimeout(function() {
                                            window.location = 'profile.php';
                                        }, 2000);
                                    });
                                </script>
                                <?php
                            } else {
                                die(mysqli_error($conn));
                            }
                        }
                    }
                    ?>
                    <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
                        <div class="mb-3">
                            <label class="form-label" for="plant">First Name</label>
                            <input type="text" name="fname" class="form-control" id="plant" placeholder="Enter First Name" value="<?php echo $firstname; ?>" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="temp">Last Name</label>
                            <input type="text" name="lname" class="form-control" id="temp" placeholder="Enter Last Name" value="<?php echo $surname; ?>" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="hum">Email</label>
                            <input type="text" name="email" class="form-control" id="hum" placeholder="Enter Email" value="<?php echo $email; ?>" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="moisture">Password</label>
                            <input type="password" name="password" class="form-control" id="moisture" placeholder="Enter Password">
                        </div>
                        <div class="d-flex justify-content-center">
                            <button type="submit" name="submit" class="form-btn"><i class="fa fa-user"></i> Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<?php
include './footer.php';
include './scripts.php';
?>
<script>
    document.querySelector("title").innerHTML="MASA - My Profile";
</script>