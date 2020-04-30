#!make

PM = npm
RM = rm -rf

PRERELEASE_FLAG ?= beta

MODULES = node_modules
DIST = dist
COVERAGE = .nyc_output coverage

.PHONY: all
all: clean $(DIST)

$(MODULES):
	$(PM) i

$(DIST): $(MODULES)
	$(PM) run build

.PHONY: clean
clean:
	$(RM) $(DIST) $(COVERAGE)

.PHONY: clean-all
clean-all:
	$(RM) $(MODULES)

.PHONY: test
test:
	$(PM) t

coverage:
	$(PM) run coverage

.PHONY: release
release:
	$(PM) run release
	git push --follow-tags origin master
	npm publish --access public

.PHONY: prerelease
prerelease:
	$(PM) run release -- --prerelease $(PRERELEASE_FLAG)
	git push --follow-tags origin master
	npm publish --tag prerelease --access public
