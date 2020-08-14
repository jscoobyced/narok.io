import Version._

enablePlugins(JavaAppPackaging)

name := "jscbe"
version := "0.1"
scalaVersion := "2.13.1"
maintainer := "Cédric Rochefolle"

scalacOptions := Seq("-unchecked", "-deprecation", "-encoding", "utf8")

libraryDependencies ++= {

  Seq(
    "com.typesafe.akka"                        %% "akka-stream"              % akkaVersion,
    "com.typesafe.akka"                        %% "akka-http"                % akkaHttpVersion,
    "com.typesafe.akka"                        %% "akka-http-spray-json"     % akkaHttpVersion,
    "net.codingwell"                           %% "scala-guice"              % guiceVersion,
    "mysql"                                    % "mysql-connector-java"      % mysqlVersion,
    "com.zaxxer"                               % "HikariCP"                  % hikaryVersion,
    "com.google.api-client"                    % "google-api-client"         % googleApiVersion,
    "org.scalatest"                            %% "scalatest"                % scalaTestVersion % "test",
    "com.googlecode.owasp-java-html-sanitizer" % "owasp-java-html-sanitizer" % htmlSanitizerVersion
  )
}
wartremoverErrors ++= Warts.unsafe

fork := true
