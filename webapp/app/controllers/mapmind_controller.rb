class MapmindController < ApplicationController

  check_authorization

  # GET /mapmind/editor
  # GET /mapmind/editor.json
  def editor
    authorize! :editor, Mapmind
  end

end

