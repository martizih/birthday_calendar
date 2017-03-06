<?php
    class SQL_Connection
    {
        private $_dbh = null;
        private const _HOST_ = "localhost";
        private const  _DB_ = "birthday";
        private const _USER_ = "MYSQL_USER";
        private const _PW_ = "MYSQL_PASSWORD";

        const _RCOLS_ = array
        (
            "name",
            "surname",
            "birthday"
        );

        function
        __construct()
        {
            $user = getenv( self::_USER_ );
            $pw = getenv( self::_PW_ );
            $host = self::_HOST_;
            $db = self::_DB_;

            $this->_dbh = 
            new PDO
            (
                "mysql:host=$host;dbname=$db",
                $user, $pw
            );
        }

        function
        select( $fields )
        {
            $cols = array_intersect
            ( 
                $fields,
                self::_RCOLS_
            );
            $cols = implode( ", ", $cols );
            $sql_query = "SELECT $cols FROM birthday";
            $stmt = $this->_dbh->query( $sql_query );
            $data = $stmt->fetchAll( PDO::FETCH_ASSOC );
            return $data;
        }
        
        function 
        __destruct()
        {
            $this->_dbh = null;
        }
    }

    $cols = array
    (
        "name",
        "surname",
        "birthday"
    );
    $conn = new SQL_Connection();
    $data = $conn->select( $cols );
    $conn = null;

    echo json_encode( $data );
?>
