#!/bin/bash

# Ścieżka do katalogu, w którym będą przechowywane kopie zapasowe
BACKUP_DIR="/backup"

# Nazwa pliku kopii zapasowej
BACKUP_FILE="users_backup_$(date +%Y%m%d%H%M%S).json"

# URI MongoDB
MONGO_URI="mongodb://mongo:27017/mydb"

# Eksportuj kolekcję users do pliku JSON
mongoexport --uri="$MONGO_URI" --collection=users --out="$BACKUP_DIR/$BACKUP_FILE"

# Usunięcie kopii zapasowych starszych niż 7 dni
find "$BACKUP_DIR" -type f -name "*.json" -mtime +7 -exec rm {} \;
