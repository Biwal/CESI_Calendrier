<div class="main-panel">
    <div class="content-wrapper">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Fichiers Disponible</h4>
                <div class="row">
                    <div class="col-12">
                        <table id="order-listing" class="table" cellspacing="0">
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Utilisateur</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>

                                <?php
                                $mysqli = mysqli_connect("127.0.0.1:3308", "root", "", "cesibackend");
                                $test = 'Venus';
                                $sql = "SELECT name, capacity FROM room WHERE name = '$test'";
                                if ($result = $mysqli->query($sql)) {
                                    while ($row = $result->fetch_assoc()) {
                                        echo "<tr><td>" . $row["capacity"] . "</td><td>" . $row["name"] . "</td></tr>";
                                    }
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>