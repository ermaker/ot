[ "$TRAVIS_PULL_REQUEST" != "false" ] && exit

GH_URI=https://$GH_TOKEN@github.com/ermaker/ot.git
TARGET_BRANCH=gh-pages
SOURCE_DIR=public
TARGET_DIR=dist

rm -rf "$TARGET_DIR"
git clone -b "$TARGET_BRANCH" --depth 1 --quiet "$GH_URI" "$TARGET_DIR"
cp -rf "$SOURCE_DIR"/* "$TARGET_DIR"

cd "$TARGET_DIR"
git add -A
git config --global user.name "`git --no-pager show --no-patch --format=%an`"
git config --global user.email "`git --no-pager show --no-patch --format=%ae`"
git commit -m "See $TRAVIS_COMMIT"
git push "$GH_URI" HEAD --quiet

