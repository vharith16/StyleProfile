json-server --watch db.json --port 5000

npm install express cors
node server.js

# Create and switch to new branch
git checkout -b public-closets-frontend

# Stage changes
git add .

# Commit
git commit -m "Add public closets UI"

# Push
git push origin public-closets-frontend

# Then on GitHub, create Pull Request → Merge to main or dev branch
