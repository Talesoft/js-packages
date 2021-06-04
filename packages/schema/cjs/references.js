"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ref = ref;

function ref(iri) {
  return {
    $ref: iri
  };
}