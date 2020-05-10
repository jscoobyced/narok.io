enablePlugins(JavaAppPackaging)

name := "jscbe"
version := "0.1"
scalaVersion := "2.13.1"
maintainer := "Cédric Rochefolle"

scalacOptions := Seq("-unchecked", "-deprecation", "-encoding", "utf8")

libraryDependencies ++= {
  val akkaV = "2.6.4"
  val akkaHttpV = "10.1.11"
  val mysqlV = "5.1.49"
  Seq(
    "com.typesafe.akka" %% "akka-stream" % akkaV,
    "com.typesafe.akka" %% "akka-http" % akkaHttpV,
    "com.typesafe.akka" %% "akka-http-spray-json" % akkaHttpV,
    "mysql" % "mysql-connector-java" % mysqlV
  )
}

fork in run := true
