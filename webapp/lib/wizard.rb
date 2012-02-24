
module Wizard

  #wizard
  def step(step)
    @current_step = step
  end

  def current_step
    @current_step || Wizard.steps.first
  end

  def next_step
    @current_step = Wizard.steps[Wizard.steps.index(current_step)+1]
  end

  def first_step?
    current_step == Wizard.steps.first
  end

  def last_step?
    current_step == Wizard.steps.last
  end

  def Wizard.steps
    %w[create confirmation]
  end

end