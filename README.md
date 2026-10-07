# Portfolio de Hajar Abdaoui

Portfolio statique bilingue français/anglais consacré à la Data Science,
à l’intelligence artificielle et aux données de santé. Navigation au scroll,
composition éditoriale rose, mise en page responsive et animations respectant
la préférence de réduction des mouvements.

## Structure

- **index.html** : structure, contenu initial en français et formulaire.
- **assets/css/style.css** : styles responsive et animations.
- **assets/js/content.js** : textes français et anglais.
- **assets/js/script.js** : langue, navigation et envoi du formulaire.
- **assets/fonts/** : polices Fraunces et Inter avec leurs licences OFL.
- **assets/images/favicon.svg** : icône du site.

Aucune compilation, aucun gestionnaire de paquets et aucune clé secrète ne sont nécessaires.

## Prévisualisation

Depuis la racine du dépôt :

~~~sh
python3 -m http.server 8000 --bind 127.0.0.1
~~~

Ouvrir le site dans le navigateur servi par ce serveur. Les modules JavaScript
nécessitent un serveur HTTP ; l’ouverture directe via file:// peut être bloquée.

Vérification syntaxique facultative, avec Node.js :

~~~sh
node --check assets/js/script.js
node --check assets/js/content.js
~~~

## Mise à jour du contenu

Modifier les traductions dans **assets/js/content.js**, en gardant les mêmes
clés dans **fr** et **en**. Maintenir également le texte français de
**index.html** pour l’indexation et l’affichage sans JavaScript.

Le choix FR/EN est mémorisé localement. La langue change sans rechargement et
sans perdre le texte saisi dans le formulaire.

Le parcours de formation comprend le master, la licence, l’année PASS et le
baccalauréat scientifique. Les projets présentés sont OEEIL, OncoTrial Tracker,
l’étude des cas de varicelle et l’étude des complications après infarctus.
Le lien du dépôt OEEIL n’ayant pas été fourni, aucun lien de projet n’est inventé.

## Formulaire de contact

URL récupérée dans l’ancien portfolio :

~~~text
https://formspree.io/f/xrbgdvbe
~~~

Les champs fullname, email, message et language sont transmis à Formspree.
Le script valide les champs, empêche les doubles envois pendant la requête et
affiche les états d’envoi, de réussite, d’erreur ou d’expiration du délai.
Les champs sont conservés en cas d’erreur. Sans JavaScript, l’action HTML et
la validation native du navigateur restent disponibles.

L’adresse destinataire se règle dans le compte Formspree associé au formulaire.
Modifier le lien Email du site ne modifie pas ce destinataire. Avant la mise en
service, vérifier que le formulaire est actif, que le destinataire est le bon
et, si une restriction de domaine est configurée, que le domaine public est autorisé.

Les vérifications de finalisation simulent les réponses Formspree pour tester
les états d’envoi, de réussite, d’échec et d’expiration, sans transmettre d’email.
Formspree a refusé les requêtes de contrôle de l’environnement cloud avec une
protection Cloudflare : la réception réelle doit être vérifiée depuis le site
public avec un message de test.

## Publication

Publier **index.html** et **assets/** ensemble sur un hébergement statique.
Les chemins relatifs fonctionnent aussi depuis un sous-répertoire, comme un
site de projet GitHub Pages.

Si GitHub Pages est utilisé, sélectionner la branche publiée et le dossier
racine comme source. Le fichier **.gitlab-ci.yml** existant reste disponible
pour une éventuelle publication sur GitLab Pages.

Un commit enregistre les changements dans Git ; un push les transfère à GitHub.
Une pull request permet ensuite de les relire et de les fusionner dans main.
Publier un environnement Codex n’effectue pas ces opérations Git.

## Licences

La licence MIT historique du dépôt est conservée dans **LICENSE**.
Les licences des polices se trouvent dans **assets/fonts/OFL-Fraunces.txt** et
**assets/fonts/OFL-Inter.txt**.
