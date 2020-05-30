package io.narok

import org.scalatest.funspec.AnyFunSpec
import org.scalatest.matchers.should.Matchers
import org.scalatest.{Inside, Inspectors, OptionValues}

abstract class BaseTest extends AnyFunSpec with Matchers with OptionValues with Inside with Inspectors
