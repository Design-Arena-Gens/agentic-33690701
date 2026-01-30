#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LIB_DIR="$ROOT/lib"
JDK_DIR="$ROOT/.jdk"
BUILD_DIR="$ROOT/build"
CLASSES_DIR="$BUILD_DIR/classes"
JAR_FILE="$BUILD_DIR/AgenticHelper.jar"
API_VERSION="1.20.4-R0.1-20240423.152506-123"
API_JAR="$LIB_DIR/spigot-api-${API_VERSION}-shaded.jar"
API_URL="https://hub.spigotmc.org/nexus/content/repositories/snapshots/org/spigotmc/spigot-api/1.20.4-R0.1-SNAPSHOT/spigot-api-${API_VERSION}-shaded.jar"
JDK_URL="https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.3%2B9/OpenJDK21U-jdk_x64_linux_hotspot_21.0.3_9.tar.gz"

JAVAC_BIN="javac"
JAR_BIN="jar"

mkdir -p "$LIB_DIR"

if ! command -v "$JAVAC_BIN" >/dev/null 2>&1 || ! command -v "$JAR_BIN" >/dev/null 2>&1; then
  if [[ -x "$JDK_DIR/bin/javac" && -x "$JDK_DIR/bin/jar" ]]; then
    JAVAC_BIN="$JDK_DIR/bin/javac"
    JAR_BIN="$JDK_DIR/bin/jar"
  else
    echo "Bootstrapping local JDK..."
    curl -L "$JDK_URL" -o "$ROOT/.jdk.tar.gz"
    tar -xzf "$ROOT/.jdk.tar.gz" -C "$ROOT"
    rm "$ROOT/.jdk.tar.gz"
    EXTRACTED_JDK="$(find "$ROOT" -maxdepth 1 -type d -name 'jdk-*' -print -quit)"
    if [[ -z "$EXTRACTED_JDK" ]]; then
      echo "Не удалось распаковать JDK." >&2
      exit 1
    fi
    rm -rf "$JDK_DIR"
    mv "$EXTRACTED_JDK" "$JDK_DIR"
    JAVAC_BIN="$JDK_DIR/bin/javac"
    JAR_BIN="$JDK_DIR/bin/jar"
  fi
fi

if [[ ! -f "$API_JAR" ]]; then
  echo "Downloading Spigot API..."
  curl -L "$API_URL" -o "$API_JAR"
fi

rm -rf "$BUILD_DIR"
mkdir -p "$CLASSES_DIR"

echo "Compiling sources..."
find "$ROOT/src/main/java" -name "*.java" > "$BUILD_DIR/sources.txt"
"$JAVAC_BIN" -cp "$API_JAR" -d "$CLASSES_DIR" @"$BUILD_DIR/sources.txt"

echo "Copying resources..."
mkdir -p "$BUILD_DIR/resources"
cp -R "$ROOT/src/main/resources/." "$BUILD_DIR/resources/"

echo "Packaging jar..."
(
  cd "$BUILD_DIR"
  "$JAR_BIN" --create --file "$JAR_FILE" \
    -C "$CLASSES_DIR" . \
    -C "$BUILD_DIR/resources" .
)

echo "Build complete: $JAR_FILE"

WEB_PUBLIC_DIR="$ROOT/../webapp/public"
if [[ -d "$WEB_PUBLIC_DIR" ]]; then
  DOWNLOAD_DIR="$WEB_PUBLIC_DIR/downloads"
  mkdir -p "$DOWNLOAD_DIR"
  cp "$JAR_FILE" "$DOWNLOAD_DIR/AgenticHelper.jar"
  echo "Copied jar to $DOWNLOAD_DIR/AgenticHelper.jar"
fi
