#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# The name of the executable 
engine_executable="dmengine"
engine_platform="x86_64-darwin"

# The path to your dmengine for running without NE
dummy_engine_path="$DIR/dmengine"

# (Windows) the path to OpenAL32.dll from defoldsdk/ext/lib/x86_64-win32/OpenAL32.dll
windows_openal32_path=""

# (Windows) the path to wrap_oal.dll from defoldsdk/ext/lib/x86_64-win32/wrap_oal.dll
windows_wrapoal_path=""

##
cmd=$1
target=$2

function clean {
    echo "# Clean"
    echo ""
    pushd "$DIR" > /dev/null
    rm -rf dmengine*
    popd > /dev/null
}

function launch {
    case $target in
        "macOS")
            platform_build_folder="x86_64-osx"
            engine_platform="x86_64-darwin"
            ;;
        "Linux")
            platform_build_folder="x86_64-linux"
            engine_platform="x86_64-linux"
            ;;
        "Windows")
            platform_build_folder="x86_64-win32"
            engine_platform="x86_64-win32"
            engine_executable="dmengine.exe"
            ;;
        *)  ;;
    esac

    # When using native extensions we must use the custom engine
    custom_engine_path="../.internal/cache/engine-archives/$engine_platform/build.zip"
    # TODO

    # Download dmengine if it doesn't exist
    if [ ! -f "$DIR/$engine_executable" ]; then
        sha1=$(curl -s http://d.defold.com/stable/info.json | sed -n 's/.*"sha1": "\(.*\)"\}/\1/p')
        echo Fetching "https://d.defold.com/archive/stable/$sha1/engine/$engine_platform/$engine_executable"
        curl -s -o "$DIR/$engine_executable" "https://d.defold.com/archive/stable/$sha1/engine/$engine_platform/$engine_executable"
    fi

    build_path="./app/build/$platform_build_folder"
    build_engine_path="$build_path/dmengine"
    projectc_path="./app/build/default/game.projectc"

    if [ -e $build_engine_path ]
    then
        # There are native extensions so the engine path is platform specific
        engine_path=$build_engine_path
    else
        # There are no native extensions so the engine path is default
        engine_path=$dummy_engine_path
    fi

    if [ $target = "Windows" ]
    then
        build_openal32_path="$build_path/OpenAL32.dll"
        if ! [ -e "$build_openal32_path" ]
        then
            cp "$windows_openal32_path" "$build_openal32_path"
        fi

        build_wrapoal_path="$build_path/wrap_oal.dll"
        if ! [ -e "$build_wrapoal_path" ]
        then
            cp "$windows_wrapoal_path" "$build_wrapoal_path"
        fi
    fi

    if [ $target = "macOS" ] && [ "$engine_path" = "$build_engine_path" ]
    then
        # On macOS we need to copy builded dmengine to the different folder
        # Otherwise dmengine launches inside VSCode
        # I don't know why
        temp_folder="./app/build/temp"
        mkdir -p "$temp_folder"

        temp_engine_path="$temp_folder/dmengine"
        cp "$build_engine_path" "$temp_engine_path"
        engine_path="$temp_engine_path"
    fi

    if [ $target = "macOS" ] || [ $target = "Linux" ]
    then
        chmod +x "$engine_path"
    fi

    echo "# Launching"
    echo "$ $engine_path $projectc_path"
    echo ""
    "$engine_path" "$projectc_path"

    if [ "$temp_folder" ]
    then
        rm -rf "$temp_folder"
    fi
}

case $cmd in
    "clean")
        clean
        ;;
    "launch")
        launch
        ;;
    *)  ;;
esac