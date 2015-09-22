.PHONY: index

GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD)
GIT_REV=$(shell git rev-parse HEAD)

index:
	mkdir -p build
	node build.js > build/index.html

deploy: index
	git diff --quiet HEAD || (git add . && git commit && git push)
	git checkout gh-pages
	git pull
	rm -rf img
	cp -rf build/img .
	cp build/index.html index.html
	git add .
	git commit -m"auto-generated $(GIT_BRANCH):$(GIT_REV)" || true
	git push
	git checkout $(GIT_BRANCH)
