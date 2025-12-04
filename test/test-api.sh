#!/bin/bash

# ------------------ COLORS ------------------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# ------------------ OUTPUT ------------------
print_header() {
  echo -e "\n${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
  echo -e "${BLUE}║${NC} ${YELLOW}$1${NC}"
  echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}\n"
}

print_success() {
  echo -e "${GREEN}✔ SUCCESSO: $1${NC}"
}

print_error() {
  echo -e "${RED}✖ ERRORE: $1${NC}"
}

print_info() {
  echo -e "${CYAN}ℹ $1${NC}"
}

print_divider() {
  echo -e "${BLUE}────────────────────────────────────────────────────────${NC}"
}

# ------------------ API TEST ------------------
register_user() {
  print_header "1. REGISTRAZIONE NUOVO UTENTE"

  RANDOM_EMAIL="test$(date +%s)@example.com"

  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/auth/register" \
    -H "Content-Type: application/json" \
    -d "{
            \"first_name\": \"Mario\",
            \"last_name\": \"Rossi\",
            \"email\": \"$RANDOM_EMAIL\",
            \"tax_code\": \"RSSMRA80A01H501D\",
            \"hashed_password\": \"Test1234!\",
            \"family_member\": false
        }")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  print_info "Email usata: $RANDOM_EMAIL"
  print_info "Response: $BODY"

  if [ "$HTTP_CODE" -eq 201 ] || [ "$HTTP_CODE" -eq 200 ]; then
    print_success "Registrazione completata! Controlla email per OTP"
    echo "$RANDOM_EMAIL" >/tmp/test_email.txt
  else
    print_error "Registrazione fallita (HTTP $HTTP_CODE)"
  fi
}

verify_email() {
  print_header "2. VERIFICA EMAIL"
  read -p "Inserisci il codice OTP ricevuto via email: " OTP

  RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/auth/verify?token=$OTP")
  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  print_info "Response: $BODY"

  if [ "$HTTP_CODE" -eq 200 ]; then
    print_success "Email verificata con successo!"
  else
    print_error "Verifica fallita (HTTP $HTTP_CODE)"
  fi
}

login() {
  print_header "3. LOGIN"

  if [ -f /tmp/test_email.txt ]; then
    EMAIL=$(cat /tmp/test_email.txt)
  else
    read -p "Inserisci email: " EMAIL
  fi
  read -s -p "Inserisci password: " PASSWORD
  echo ""

  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/auth/login" \
    -H "Content-Type: application/json" \
    -c /tmp/cookies.txt \
    -d "{
            \"email\": \"$EMAIL\",
            \"password\": \"$PASSWORD\"
        }")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  print_info "Response: $BODY"

  if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 201 ]; then
    TOKEN=$(grep -oP 'Bearer \K[^ ]+' /tmp/cookies.txt 2>/dev/null || echo "")
    if [ -z "$TOKEN" ]; then
      COOKIE_TOKEN=$(grep "Token" /tmp/cookies.txt | awk '{print $7}')
      if [ ! -z "$COOKIE_TOKEN" ]; then
        TOKEN="$COOKIE_TOKEN"
      fi
    fi
    if [ ! -z "$TOKEN" ]; then
      echo "$TOKEN" >/tmp/jwt_token.txt
      print_success "Login riuscito! Token salvato"
    else
      print_error "Login riuscito ma token non trovato"
    fi
  else
    print_error "Login fallito (HTTP $HTTP_CODE)"
  fi
}

get_me() {
  print_header "4. GET PROFILO UTENTE (/me)"
  if [ -f /tmp/jwt_token.txt ]; then
    TOKEN=$(cat /tmp/jwt_token.txt)
  fi
  if [ -z "$TOKEN" ]; then
    print_error "Devi fare login prima!"
    return
  fi

  RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/accounts/me" \
    -H "Authorization: Bearer $TOKEN" -b /tmp/cookies.txt)

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"

  if [ "$HTTP_CODE" -eq 200 ]; then
    print_success "Profilo recuperato con successo"
  else
    print_error "Errore nel recupero profilo (HTTP $HTTP_CODE)"
  fi
}

update_password() {
  print_header "5. AGGIORNA PASSWORD"
  if [ -f /tmp/jwt_token.txt ]; then
    TOKEN=$(cat /tmp/jwt_token.txt)
  fi
  if [ -z "$TOKEN" ]; then
    print_error "Devi fare login prima!"
    return
  fi

  read -s -p "Password attuale: " CURRENT_PASS
  echo ""
  read -s -p "Nuova password: " NEW_PASS
  echo ""

  RESPONSE=$(curl -s -w "\n%{http_code}" -X PATCH "$BASE_URL/accounts/password" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -b /tmp/cookies.txt \
    -d "{
            \"currentPassword\": \"$CURRENT_PASS\",
            \"newPassword\": \"$NEW_PASS\"
        }")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  print_info "Response: $BODY"

  if [ "$HTTP_CODE" -eq 200 ]; then
    print_success "Password aggiornata!"
  else
    print_error "Aggiornamento fallito (HTTP $HTTP_CODE)"
  fi
}

request_password_reset() {
  print_header "6. RICHIESTA RESET PASSWORD"
  read -p "Inserisci email: " EMAIL

  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/auth/recoverPassword" \
    -H "Content-Type: application/json" \
    -d "{\"email\": \"$EMAIL\"}")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  print_info "Response: $BODY"

  if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 201 ]; then
    print_success "Email di reset inviata! Controlla la casella"
  else
    print_error "Richiesta fallita (HTTP $HTTP_CODE)"
  fi
}

reset_password() {
  print_header "7. RESET PASSWORD CON OTP"
  read -p "Inserisci OTP ricevuto via email: " OTP
  read -s -p "Nuova password: " NEW_PASS
  echo ""

  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/auth/resetPassword" \
    -H "Content-Type: application/json" \
    -d "{
            \"token\": $OTP,
            \"newPassword\": \"$NEW_PASS\"
        }")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  print_info "Response: $BODY"

  if [ "$HTTP_CODE" -eq 200 ]; then
    print_success "Password reimpostata con successo!"
  else
    print_error "Reset fallito (HTTP $HTTP_CODE)"
  fi
}

get_all_accounts() {
  print_header "8. GET TUTTI GLI ACCOUNT (OFFICER)"
  if [ -f /tmp/jwt_token.txt ]; then
    TOKEN=$(cat /tmp/jwt_token.txt)
  fi
  if [ -z "$TOKEN" ]; then
    print_error "Devi fare login prima!"
    return
  fi

  RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/accounts" \
    -H "Authorization: Bearer $TOKEN" -b /tmp/cookies.txt)

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"

  if [ "$HTTP_CODE" -eq 200 ]; then
    print_success "Lista account recuperata"
  else
    print_error "Errore (HTTP $HTTP_CODE) - Probabilmente mancano i permessi"
  fi
}

update_profile() {
  print_header "9. AGGIORNA PROFILO"
  if [ -f /tmp/jwt_token.txt ]; then
    TOKEN=$(cat /tmp/jwt_token.txt)
  fi
  if [ -z "$TOKEN" ]; then
    print_error "Devi fare login prima!"
    return
  fi

  read -p "ID account da aggiornare: " ACCOUNT_ID
  read -p "Nuovo nome: " FIRST_NAME
  read -p "Nuovo cognome: " LAST_NAME

  RESPONSE=$(curl -s -w "\n%{http_code}" -X PATCH "$BASE_URL/accounts/profile/$ACCOUNT_ID" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" -b /tmp/cookies.txt \
    -d "{
            \"first_name\": \"$FIRST_NAME\",
            \"last_name\": \"$LAST_NAME\"
        }")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"

  if [ "$HTTP_CODE" -eq 200 ]; then
    print_success "Profilo aggiornato!"
  else
    print_error "Aggiornamento fallito (HTTP $HTTP_CODE)"
  fi
}

send_digital_flower() {
  print_header "10. INVIA FIORE DIGITALE"

  if [ -f /tmp/jwt_token.txt ]; then
    TOKEN=$(cat /tmp/jwt_token.txt)
  fi

  if [ -z "$TOKEN" ]; then
    print_error "Devi fare login prima!"
    return
  fi

  read -p "Account ID mittente (integer): " ACCOUNT_ID
  read -p "ID tomba (grave_id) (integer): " GRAVE_ID
  read -p "Tipo fiore (es. OTHER, ROSE, LILY): " TYPE
  DURATION="2025-12-01T19:38:37Z"

  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/digital_flowers" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
            \"type\": \"$TYPE\",
            \"account_id\": $ACCOUNT_ID,
            \"grave_id\": $GRAVE_ID
        }")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  print_info "Response: $BODY"

  if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 201 ]; then
    print_success "Fiore digitale inviato con successo!"
  else
    print_error "Invio fiore digitale fallito (HTTP $HTTP_CODE)"
  fi
}

get_all_graves() {
  print_header "11. GET TUTTE LE TOMBE (PAGINATE)"

  if [ -f /tmp/jwt_token.txt ]; then
    TOKEN=$(cat /tmp/jwt_token.txt)
  fi

  if [ -z "$TOKEN" ]; then
    print_error "Devi fare login prima!"
    return
  fi

  RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/graves?page=1&limit=10" \
    -H "Authorization: Bearer $TOKEN")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"

  if [ "$HTTP_CODE" -eq 200 ]; then
    print_success "Tombe recuperate con successo"
  else
    print_error "Errore nel recupero tombe (HTTP $HTTP_CODE)"
  fi
}

get_grave_by_id() {
  print_header "12. GET TOMBA PER ID"

  if [ -f /tmp/jwt_token.txt ]; then
    TOKEN=$(cat /tmp/jwt_token.txt)
  fi

  if [ -z "$TOKEN" ]; then
    print_error "Devi fare login prima!"
    return
  fi

  read -p "Inserisci ID tomba: " GRAVE_ID

  RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/graves/$GRAVE_ID" \
    -H "Authorization: Bearer $TOKEN")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"

  if [ "$HTTP_CODE" -eq 200 ]; then
    print_success "Tomba recuperata con successo"
  else
    print_error "Errore nel recupero tomba (HTTP $HTTP_CODE)"
  fi
}

create_grave() {
  print_header "13. CREA NUOVA TOMBA (OFFICER)"

  if [ -f /tmp/jwt_token.txt ]; then
    TOKEN=$(cat /tmp/jwt_token.txt)
  fi

  if [ -z "$TOKEN" ]; then
    print_error "Devi fare login prima! (Richiede permessi OFFICER)"
    return
  fi

  read -p "Nome del defunto: " NAME
  read -p "Cognome: " SURNAME
  read -p "Data di nascita (YYYY-MM-DD): " DOB
  read -p "Data di morte (YYYY-MM-DD): " DOD
  read -p "Numero tomba: " GRAVE_NUMBER

  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/graves" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
            \"name\": \"$NAME\",
            \"surname\": \"$SURNAME\",
            \"date_of_birth\": \"${DOB}T00:00:00Z\",
            \"date_of_death\": \"${DOD}T00:00:00Z\",
            \"grave_number\": \"$GRAVE_NUMBER\"
        }")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"

  if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 201 ]; then
    print_success "Tomba creata con successo!"
    echo "$BODY" | jq '.id' > /tmp/grave_id.txt
  else
    print_error "Creazione tomba fallita (HTTP $HTTP_CODE)"
  fi
}

update_grave() {
  print_header "14. AGGIORNA TOMBA (OFFICER)"

  if [ -f /tmp/jwt_token.txt ]; then
    TOKEN=$(cat /tmp/jwt_token.txt)
  fi

  if [ -z "$TOKEN" ]; then
    print_error "Devi fare login prima! (Richiede permessi OFFICER)"
    return
  fi

  read -p "ID tomba da aggiornare: " GRAVE_ID
  read -p "Nuovo numero tomba (lascia vuoto per non cambiare): " NEW_GRAVE_NUMBER

  if [ -z "$NEW_GRAVE_NUMBER" ]; then
    print_info "Campo vuoto, nessun aggiornamento"
    return
  fi

  RESPONSE=$(curl -s -w "\n%{http_code}" -X PATCH "$BASE_URL/graves/$GRAVE_ID" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
            \"grave_number\": \"$NEW_GRAVE_NUMBER\"
        }")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"

  if [ "$HTTP_CODE" -eq 200 ]; then
    print_success "Tomba aggiornata con successo!"
  else
    print_error "Aggiornamento tomba fallito (HTTP $HTTP_CODE)"
  fi
}

delete_grave() {
  print_header "15. ELIMINA TOMBA (OFFICER)"

  if [ -f /tmp/jwt_token.txt ]; then
    TOKEN=$(cat /tmp/jwt_token.txt)
  fi

  if [ -z "$TOKEN" ]; then
    print_error "Devi fare login prima! (Richiede permessi OFFICER)"
    return
  fi

  read -p "ID tomba da eliminare: " GRAVE_ID
  read -p "Sei sicuro? (s/n): " confirm

  if [ "$confirm" != "s" ]; then
    print_info "Operazione annullata"
    return
  fi

  RESPONSE=$(curl -s -w "\n%{http_code}" -X DELETE "$BASE_URL/graves/$GRAVE_ID" \
    -H "Authorization: Bearer $TOKEN")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  print_info "Response: $BODY"

  if [ "$HTTP_CODE" -eq 200 ]; then
    print_success "Tomba eliminata con successo!"
  else
    print_error "Eliminazione tomba fallita (HTTP $HTTP_CODE)"
  fi
}

get_all_messages() {
  print_header "16. GET TUTTI I MESSAGGI (PAGINATE)"

  if [ -f /tmp/jwt_token.txt ]; then
    TOKEN=$(cat /tmp/jwt_token.txt)
  fi

  if [ -z "$TOKEN" ]; then
    print_error "Devi fare login prima! (Richiede permessi OFFICER)"
    return
  fi

  RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/messages?page=1&limit=10" \
    -H "Authorization: Bearer $TOKEN")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"

  if [ "$HTTP_CODE" -eq 200 ]; then
    print_success "Messaggi recuperati con successo"
  else
    print_error "Errore nel recupero messaggi (HTTP $HTTP_CODE)"
  fi
}

get_my_messages() {
  print_header "17. GET I MIEI MESSAGGI"

  if [ -f /tmp/jwt_token.txt ]; then
    TOKEN=$(cat /tmp/jwt_token.txt)
  fi

  if [ -z "$TOKEN" ]; then
    print_error "Devi fare login prima!"
    return
  fi

  RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/messages/me?page=1&limit=10" \
    -H "Authorization: Bearer $TOKEN")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"

  if [ "$HTTP_CODE" -eq 200 ]; then
    print_success "I tuoi messaggi recuperati con successo"
  else
    print_error "Errore nel recupero messaggi (HTTP $HTTP_CODE)"
  fi
}

create_message() {
  print_header "18. CREA NUOVO MESSAGGIO"

  if [ -f /tmp/jwt_token.txt ]; then
    TOKEN=$(cat /tmp/jwt_token.txt)
  fi

  if [ -z "$TOKEN" ]; then
    print_error "Devi fare login prima!"
    return
  fi

  read -p "Tipo messaggio (notification, request): " MESSAGE_TYPE
  read -p "Descrizione: " DESCRIPTION
  read -p "Tipo (maintenance, other): " TYPE
  read -p "Status (sent, read, archived): " STATUS
  read -p "ID richiesta ufficio: " REQUEST_OFFICE_ID

  RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/messages" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
            \"message_type\": \"$MESSAGE_TYPE\",
            \"description\": \"$DESCRIPTION\",
            \"type\": \"$TYPE\",
            \"status\": \"$STATUS\",
            \"id_request_office\": $REQUEST_OFFICE_ID
        }")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"

  if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 201 ]; then
    print_success "Messaggio creato con successo!"
  else
    print_error "Creazione messaggio fallita (HTTP $HTTP_CODE)"
  fi
}

get_all_deceased() {
  print_header "19. GET TUTTI I DEFUNTI (PAGINATE)"

  if [ -f /tmp/jwt_token.txt ]; then
    TOKEN=$(cat /tmp/jwt_token.txt)
  fi

  if [ -z "$TOKEN" ]; then
    print_error "Devi fare login prima! (Richiede permessi OFFICER)"
    return
  fi

  RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/deceased?page=1&limit=10" \
    -H "Authorization: Bearer $TOKEN")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"

  if [ "$HTTP_CODE" -eq 200 ]; then
    print_success "Defunti recuperati con successo"
  else
    print_error "Errore nel recupero defunti (HTTP $HTTP_CODE)"
  fi
}

health_check() {
  print_header "0. HEALTH CHECK"
  RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL/health" 2>/dev/null)
  if [ $? -eq 0 ]; then
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    BODY=$(echo "$RESPONSE" | sed '$d')
    if [ "$HTTP_CODE" -eq 200 ] || [ "$HTTP_CODE" -eq 404 ]; then
      print_success "Server raggiungibile su $BASE_URL"
    else
      print_error "Server risponde con HTTP $HTTP_CODE"
    fi
  else
    print_error "Server non raggiungibile su $BASE_URL"
  fi
}

cleanup() {
  rm -f /tmp/jwt_token.txt /tmp/cookies.txt /tmp/test_email.txt
  print_success "File temporanei puliti"
}

# ------------------ MENU ------------------
show_menu() {
  echo -e "\n${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
  echo -e "${GREEN}║                ZERACHIEL API TESTING TOOL             ║${NC}"
  echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}\n"

  echo "Server: $BASE_URL"
  if [ -f /tmp/jwt_token.txt ]; then
    echo -e "${GREEN}Token: presente${NC}"
  else
    echo -e "${RED}Token: non presente${NC}"
  fi
  echo ""

  echo -e "${BLUE}=== AUTENTICAZIONE ===${NC}"
  echo "  1) Registra nuovo utente"
  echo "  2) Verifica email (OTP)"
  echo "  3) Login"

  echo -e "\n${BLUE}=== PROFILO ===${NC}"
  echo "  4) Ottieni profilo (/me)"
  echo "  5) Aggiorna password"
  echo "  9) Aggiorna profilo"

  echo -e "\n${BLUE}=== RESET PASSWORD ===${NC}"
  echo "  6) Richiedi reset password"
  echo "  7) Reset password (OTP)"

  echo -e "\n${BLUE}=== ADMIN ===${NC}"
  echo "  8) Lista tutti gli account (OFFICER)"

  echo -e "\n${BLUE}=== TOMBE (GRAVES) ===${NC}"
  echo " 11) Get tutte le tombe (paginate)"
  echo " 12) Get tomba per ID"
  echo " 13) Crea nuova tomba (OFFICER)"
  echo " 14) Aggiorna tomba (OFFICER)"
  echo " 15) Elimina tomba (OFFICER)"

  echo -e "\n${BLUE}=== MESSAGGI ===${NC}"
  echo " 16) Get tutti i messaggi (paginate)"
  echo " 17) Get i miei messaggi"
  echo " 18) Crea nuovo messaggio"

  echo -e "\n${BLUE}=== DEFUNTI (DECEASED) ===${NC}"
  echo " 19) Get tutti i defunti (paginate)"

  echo -e "\n${BLUE}=== DIGITAL FLOWERS ===${NC}"
  echo " 10) Invia fiore digitale"

  echo -e "\n${BLUE}=== UTILITY ===${NC}"
  echo "  0) Health check"
  echo "  h) Mostra menu"
  echo "  q) Esci"
  echo ""
}

# ------------------ MAIN LOOP ------------------
main() {

  if [ -z "$BASE_URL" ]; then
    read -p "Inserisci BASE_URL del server API: " BASE_URL

    BASE_URL=$(echo "$BASE_URL" | xargs)
  fi

  health_check

  while true; do
    show_menu
    read -p "Scegli un'opzione: " choice
    case $choice in
    0) health_check ;;
    1) register_user ;;
    2) verify_email ;;
    3) login ;;
    4) get_me ;;
    5) update_password ;;
    6) request_password_reset ;;
    7) reset_password ;;
    8) get_all_accounts ;;
    9) update_profile ;;
    10) send_digital_flower ;;
    11) get_all_graves ;;
    12) get_grave_by_id ;;
    13) create_grave ;;
    14) update_grave ;;
    15) delete_grave ;;
    16) get_all_messages ;;
    17) get_my_messages ;;
    18) create_message ;;
    19) get_all_deceased ;;
    h) continue ;;
    q)
      read -p "Vuoi pulire i file temporanei? (y/n) > " clean
      [ "$clean" = "y" ] && cleanup
      print_info "Ciao!"
      exit 0
      ;;
    *) print_error "Opzione non valida" ;;
    esac
    print_divider
    read -p "Premi INVIO per continuare..."
  done
}

# ------------------ SCRIPT START ------------------
if [ "$1" = "--clean" ]; then
  cleanup
  exit 0
fi

main
