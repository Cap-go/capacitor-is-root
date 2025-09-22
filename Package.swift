// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapgoCapacitorIsRoot",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "CapgoCapacitorIsRoot",
            targets: ["IsRootPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0")
    ],
    targets: [
        .target(
            name: "IsRootPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/IsRootPlugin"),
        .testTarget(
            name: "IsRootPluginTests",
            dependencies: ["IsRootPlugin"],
            path: "ios/Tests/IsRootPluginTests")
    ]
)
