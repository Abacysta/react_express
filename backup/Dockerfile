FROM mongo:4.4

# Instalacja cron i innych niezbędnych narzędzi
RUN apt-get update && apt-get install -y cron && apt-get clean

# Skopiuj skrypt do kontenera
COPY backup.sh /usr/local/bin/backup.sh

# Ustaw odpowiednie uprawnienia dla skryptu
RUN chmod +x /usr/local/bin/backup.sh

# Dodaj cron job do crontab
RUN (crontab -l ; echo "0 * * * * /usr/local/bin/backup.sh") | crontab -

# Utworzenie katalogu na kopie zapasowe
RUN mkdir /backup

# Ustawienie katalogu na kopie zapasowe jako wolumen
VOLUME /backup

# Uruchomienie cron w trybie foreground
CMD ["cron", "-f"]
