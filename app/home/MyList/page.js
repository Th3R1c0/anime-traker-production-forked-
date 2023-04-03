"use client";

import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import React from "react";

import { useAnimeStore, useSearchStore } from "../../../lib/store.ts";

import Animelist from "../../../components/animelist";

export default function Page() {

  return <Animelist />;
}
